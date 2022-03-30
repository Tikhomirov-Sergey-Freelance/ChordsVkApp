import { collection, getDocs, where, query, Query, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { Firebase } from "stores/root-store"
import { iArtist } from 'types/artists'


export const loadArtistsByQuery = async (q: string) => {

    const querySnapshot =
        query(
            collection(await Firebase.getFirestore(), 'artists'),
            where('searchName', '>=', q.toUpperCase()),
            where('searchName', '<=', q.toUpperCase() + '\uf8ff'));

    const data = await getDocs(querySnapshot)
    return data.docs.map(item => item.data()) as iArtist[]
}

export const loadArtistsByIds = async (ids: string[]) => {

    if (!ids.length) return []

    const querySnapshot =
        query(
            collection(await Firebase.getFirestore(), 'artists'),
            where('id', 'in', ids));

    const data = await getDocs(querySnapshot)
    return data.docs.map(item => item.data()) as iArtist[]
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

export const saveArtist = async (artist: iArtist) => {

    const firestore = await Firebase.getFirestore()
    return await setDoc(doc(firestore, `artists/${artist.id}`), artist)
}

export const updateArtist = async (artist: iArtist) => {

    const firestore = await Firebase.getFirestore()
    return await updateDoc(doc(firestore, `artists/${artist.id}`), { ...artist })
}