import { collection, getDocs, where, query, Query } from "firebase/firestore"
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