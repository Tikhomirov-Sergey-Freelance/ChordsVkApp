import { artistToShortArtist } from 'code/artist/mapper'
import { arrayToPools } from 'code/common/array'
import { collection, getDocs, where, query, getDoc, doc, runTransaction } from 'firebase/firestore'
import { Firebase } from 'stores/root-store'
import { iAddArtistDTO, iArtist, iShortArtist } from 'types/artists'
import { loadArtistTagsByQuery } from './artist-tags'
import client from '../apollo-client'
import { AllShortArtistQuery } from '../graphql/queries/artist'
import { AddArtistMutation } from '../graphql/mutations/artist'

export const loadArtistByTags = async (tag: string) => {

    try {

        const tags = await loadArtistTagsByQuery(tag)
        const ids = tags.reduce((accum: string[], tag) => {

            if(!accum.includes(tag.artistId)) {
                accum.push(tag.artistId)
            }

            return accum

        }, [])

        if(!ids.length) return []

        return loadArtistsByIds(ids)

    } catch (error) {
        return []
    }
}

export const loadAllArtists = async () => {

    const { data, error } = 
        await client.query<{ artists: iShortArtist[]}>({ query: AllShortArtistQuery })
    
    if(error) {
        return []
    }

    return data.artists
}

export const loadArtistsByQuery = async (q: string) => {

    try {
        const querySnapshot =
            query(
                collection(await Firebase.getFirestore(), 'short-artists'),
                where('searchName', '>=', q.toUpperCase()),
                where('searchName', '<=', q.toUpperCase() + '\uf8ff'))

        const data = await getDocs(querySnapshot)
        return data.docs.map(item => item.data()) as iShortArtist[]

    } catch (error) {
        return []
    }
}

export const loadArtistsByNames = async (names: string[]) => {

    if (!names.length) return []

    const items = names.map(name => name.toUpperCase())
    const pools = arrayToPools(items)

    try {

        const requests = pools.map(async names => {

            const querySnapshot =
                query(
                    collection(await Firebase.getFirestore(), 'short-artists'),
                    where('searchName', 'in', names))

            return await getDocs(querySnapshot)
        })

        const result = await Promise.all(requests)
        const documents = result.map(res => res.docs).flat(1)

        return documents.map(item => item.data()) as iShortArtist[]

    } catch (error) {
        return []
    }

}

export const loadArtistsByIds = async (ids: string[]) => {

    if (!ids.length) return []

    try {

        const pools = arrayToPools(ids)
        const requests = pools.map(async idList => {

            const querySnapshot =
            query(
                collection(await Firebase.getFirestore(), 'short-artists'),
                where('id', 'in', idList)
            )

            return await getDocs(querySnapshot)
        })

        const result = await Promise.all(requests)
        const documents = result.map(res => res.docs).flat(1)

        return documents.map(item => item.data()) as iShortArtist[]

    } catch (error) {
        return []
    }
}

export const loadArtistById = async (id: string) => {

    try {

        if (!id) return null

        const reference = doc(await Firebase.getFirestore(), `artists/${id}`)
        const artist = await getDoc(reference)

        return artist?.data() as iArtist

    } catch (error) {
        return null
    }
}

export const loadShortArtistById = async (id: string) => {

    try {

        if (!id) return null

        const reference = doc(await Firebase.getFirestore(), `short-artists/${id}`)
        const artist = await getDoc(reference)

        return artist?.data() as iShortArtist

    } catch (error) {
        return null
    }
}

export const addArtist = async (artist: iAddArtistDTO) => {

    const { data, errors } = await client.mutate<{ addArtist: { id: string } }>({ 
        mutation: AddArtistMutation, 
        variables: { artist }
    })

    if(errors && errors.length) {
        return false
    }

    return data.addArtist.id
}

export const updateArtist = async (artist: iArtist) => {

    const firestore = await Firebase.getFirestore()

    try {

        await runTransaction(firestore, async transaction => {
            transaction.update(doc(firestore, `artists/${artist.id}`), { ...artist })
            transaction.update(doc(firestore, `short-artists/${artist.id}`), { ...artistToShortArtist(artist) })
        })

        return true

    } catch (error) {
        return false
    }
}