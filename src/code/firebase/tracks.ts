import { collection, getDocs, where, query, Query, orderBy, limit, doc, updateDoc } from "firebase/firestore"
import GlobalStore from "../../stores/global-store"
import { iTrack, iTrackView } from "../../types/track"
import { loadArtistsByIds } from "./artists";


export const loadLastTracks = async (count: number) => {

    const querySnapshot = 
    query(
        collection(await GlobalStore.firebase.getFirestore(), "tracks"), 
        orderBy('addedDate'),
        limit(count)
        );

    const data = await getDocs(querySnapshot)
    const tracks = data.docs.map(item => item.data()) as iTrack[]

    const artistsIds = tracks.map(track => track.artistId)
    const artists = await loadArtistsByIds(artistsIds)

    const tracksView: iTrackView[] = tracks.map(track => {

        const artist = artists.find(art => art.id === track.artistId)

        return {
            ...track,
            artist
        }
    })

    return tracksView
} 

export const loadTracksByArtist = async (artistId: string) => {

    const querySnapshot = 
    query(
        collection(await GlobalStore.firebase.getFirestore(), "tracks"), 
        where('artistId', '==', artistId)
        );

    const data = await getDocs(querySnapshot)
    return data.docs.map(item => item.data()) as iTrackView[]
}

export const updateTracksSearchName = async (searchName: string[], trackId: string) => {

    const document = doc(await GlobalStore.firebase.getFirestore(), `tracks/${trackId}`)
    await updateDoc(document, { searchName })
}