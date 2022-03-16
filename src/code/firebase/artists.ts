import { collection, getDocs, where, query, Query, getDoc, doc } from 'firebase/firestore'
import GlobalStore from 'stores/global-store'
import { iArtist } from 'types/artists'


export const loadArtistsByQuery = async (q: string) => {

    const querySnapshot =
        query(
            collection(await GlobalStore.firebase.getFirestore(), 'artists'),
            where('searchName', '>=', q.toUpperCase()),
            where('searchName', '<=', q.toUpperCase() + '\uf8ff'));

    const data = await getDocs(querySnapshot)
    return data.docs.map(item => item.data()) as iArtist[]
}

export const loadArtistsByIds = async (ids: string[]) => {

    if (!ids.length) return []

    const querySnapshot =
        query(
            collection(await GlobalStore.firebase.getFirestore(), 'artists'),
            where('id', 'in', ids));

    const data = await getDocs(querySnapshot)
    return data.docs.map(item => item.data()) as iArtist[]
}

export const loadArtistById = async (id: string) => {

    try {

        if (!id) return null

        const reference = doc(await GlobalStore.firebase.getFirestore(), `artists/${id}`)
        const artist = await getDoc(reference)

        return artist?.data() as iArtist

    } catch (error) {
        console.error(error)
        return null
    }
}