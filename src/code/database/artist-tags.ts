import { collection, getDocs, where, query, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { Firebase } from 'stores/root-store'
import { iArtistTag } from 'types/artists'

export const loadArtistTagsByQuery = async (tagQuery: string) => {

    try {

        const q = tagQuery.toUpperCase()

        const querySnapshot =
            query(
                collection(await Firebase.getFirestore(), 'artist-tags'),
                where('tag', '>=', q),
                where('tag', '<=', q + '\uf8ff'))

        const data = await getDocs(querySnapshot)
        const tags = data.docs.map(item => item.data()) as iArtistTag[]

        return tags.filter(tag => tag.strict ? tag.tag === q : true)

    } catch (error) {
        return []
    }
}

export const loadArtistTagsById = async (artistId: string) => {

    const firestore = await Firebase.getFirestore()

    try {

        const querySnapshot =
        query(
            collection(firestore, 'artist-tags'),
            where('artistId', '==', artistId))

        const data = await getDocs(querySnapshot)
        return data.docs.map(item => item.data()) as iArtistTag[]

    } catch (error) {
        return []
    }
}

export const updateArtistTags = async (forAdd: iArtistTag[], forDelete: iArtistTag[]) => {

    const firestore = await Firebase.getFirestore()

    try {

        const add = forAdd.map(tag => {
            const collection = doc(firestore, `artist-tags/${tag.id}`)
            setDoc(collection, tag)
        })

        const dell = forDelete.map(tag => {
            const collection = doc(firestore, `artist-tags/${tag.id}`)
            deleteDoc(collection)
        })

        await Promise.all([...add, ...dell])

        return true

    } catch (error) {
        return false
    }
}