import { collection, getDocs, where, query, Query, doc, getDoc } from "firebase/firestore"
import GlobalStore from "stores/global-store"
import { iChord } from "types/chord"


export const loadChordsByQuery = async (q: string) => {

    const querySnapshot =
        query(
            collection(await GlobalStore.firebase.getFirestore(), "chords"),
            where('name', '>=', q.toUpperCase()),
            where('name', '<=', q.toUpperCase() + '\uf8ff'));

    const data = await getDocs(querySnapshot)
    return data.docs.map(item => item.data()) as iChord[]
}

export const loadChordByKey = async (key: string) => {

    try {

        const reference = doc(await GlobalStore.firebase.getFirestore(), `chords/${key}`)
        const data = await getDoc(reference)

        return data?.data() as iChord

    } catch (error) {
        console.error(error)
        return null
    }
}

export const loadChordsByKeys = async (keys: string[]) => {

    try {

        if(!keys.length) return []

        const querySnapshot =
            query(
                collection(await GlobalStore.firebase.getFirestore(), "chords"),
                where('name', 'in', keys)
            );

        const data = await getDocs(querySnapshot)
        return data.docs.map(item => item.data()) as iChord[]

    } catch (error) {
        console.error(error)
        return null
    }
}