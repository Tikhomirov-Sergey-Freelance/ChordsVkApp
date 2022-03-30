import { collection, getDocs, where, query, Query, doc, getDoc, setDoc } from "firebase/firestore"
import { Firebase } from "stores/root-store"
import { iChord } from "types/chord"

export const addChord = async (chord: iChord) => {

    try {

        const document = doc(await Firebase.getFirestore(), `chords/${chord.name}`)
        return setDoc(document, chord)

    } catch (error) {
        console.error(error)
        return false
    }
}

export const loadAllChords = async () => {
    return (await getDocs(collection(await Firebase.getFirestore(), "chords"))).docs.map(doc => doc.data() as iChord)
}

export const loadChordsByQuery = async (q: string) => {

    const querySnapshot =
        query(
            collection(await Firebase.getFirestore(), "chords"),
            where('name', '>=', q.toUpperCase()),
            where('name', '<=', q.toUpperCase() + '\uf8ff'));

    const data = await getDocs(querySnapshot)
    return data.docs.map(item => item.data()) as iChord[]
}

export const loadChordByKey = async (key: string) => {

    try {

        const reference = doc(await Firebase.getFirestore(), `chords/${key}`)
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
                collection(await Firebase.getFirestore(), "chords"),
                where('name', 'in', keys)
            );

        const data = await getDocs(querySnapshot)
        return data.docs.map(item => item.data()) as iChord[]

    } catch (error) {
        console.error(error)
        return null
    }
}