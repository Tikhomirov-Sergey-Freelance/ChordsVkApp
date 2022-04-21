import { artistToShortArtist } from 'code/artist/mapper';
import { collection, getDocs, where, query, Query, getDoc, doc, setDoc, updateDoc, runTransaction } from 'firebase/firestore'
import { Firebase } from "stores/root-store"
import { iArtist, iShortArtist } from 'types/artists'


export const loadArtistsByQuery = async (q: string) => {

    try {
        const querySnapshot =
            query(
                collection(await Firebase.getFirestore(), 'short-artists'),
                where('searchName', '>=', q.toUpperCase()),
                where('searchName', '<=', q.toUpperCase() + '\uf8ff'));

        const data = await getDocs(querySnapshot)
        return data.docs.map(item => item.data()) as iShortArtist[]
        
    } catch (error) {
        console.error(error)
        return []
    }
}

export const loadArtistsByNames = async (names: string[]) => {

    if(!names.length) return []

    const pools: string[][] = names.reduce((accum, current) => {

        const name = current.toUpperCase()
        const lastArray = accum[accum.length - 1]

        if(lastArray.length >= 10) {
            accum.push([name])
        } else {
            lastArray.push(name)
        }

        return accum

    }, [[]])

    try {

        const requests = pools.map(async names => {

            const querySnapshot =
            query(
                collection(await Firebase.getFirestore(), 'short-artists'),
                where('searchName', 'in', names));

            return await getDocs(querySnapshot)
        })

        const result = await Promise.all(requests)
        const documents = result.map(res => res.docs).flat(1)

        return documents.map(item => item.data()) as iShortArtist[]
        
    } catch (error) {
        console.error(error)
        return []
    }

}

export const loadArtistsByIds = async (ids: string[]) => {

    if (!ids.length) return []

    const querySnapshot =
        query(
            collection(await Firebase.getFirestore(), 'short-artists'),
            where('id', 'in', ids));

    const data = await getDocs(querySnapshot)
    return data.docs.map(item => item.data()) as iShortArtist[]
}

export const loadArtistById = async (id: string) => {

    try {

        if (!id) return null

        const reference = doc(await Firebase.getFirestore(), `artists/${id}`)
        const artist = await getDoc(reference)

        return artist?.data() as iArtist

    } catch (error) {
        console.error(error)
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
        console.error(error)
        return null
    }
}

export const addArtist = async (artist: iArtist) => {

    const firestore = await Firebase.getFirestore()

    try {

        await runTransaction(firestore, async transaction => {
            transaction.set(doc(firestore, `artists/${artist.id}`), artist)
            transaction.set(doc(firestore, `short-artists/${artist.id}`), artistToShortArtist(artist))
        })

        return true

    } catch (error) {
        console.error(error)
        return false
    }
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
        console.error(error)
        return false
    }
}