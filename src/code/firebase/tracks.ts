import { collection, getDocs, where, query, Query, orderBy, limit, doc, updateDoc, getDoc } from "firebase/firestore"
import GlobalStore from "../../stores/global-store"
import { iTrack, iTrackView } from "../../types/track"
import { loadArtistById, loadArtistsByIds } from "./artists";

export const loadTrackById = async (id: string) => {

    try {

        if (!id) return null

        const reference = doc(await GlobalStore.firebase.getFirestore(), `tracks/${id}`)
        const data = await getDoc(reference)

        if(!data.exists()) return null

        const track = data?.data() as iTrack
        const artist = await loadArtistById(track.artistId)
        
        return { ...track, artist } as iTrackView

    } catch (error) {
        console.error(error)
        return null
    }
}

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