import { collection, getDocs, where, query, Query } from "firebase/firestore"
import GlobalStore from "stores/global-store"
import { iArtist } from "types/artists"


export const loadArtistsByQuery = async (q: string) => {

    const querySnapshot = query(collection(GlobalStore.firestore, "artists"), where("searchName", ">=", q.toUpperCase()));

    const data = await getDocs(querySnapshot)
    return data.docs.map(item => item.data()) as iArtist[]
} 