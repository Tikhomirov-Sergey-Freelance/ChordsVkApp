import { collection, getDocs, where, query, Query, orderBy, limit, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'
import { Firebase } from "stores/root-store"
import { iTrack, iTrackView } from '../../types/track'
import { loadArtistById, loadArtistsByIds } from './artists'

export const addTrack = async (track: iTrack) => {

    try {

        const document = doc(await Firebase.getFirestore(), `tracks/${track.id}`)
        return await setDoc(document, track)

    } catch (error) {
        console.error(error)
        return false
    }
}

export const updateTrack = async (trackId: string, track: Partial<iTrack>) => {

    try {

        const document = doc(await Firebase.getFirestore(), `tracks/${trackId}`)
        return await updateDoc(document, { ...track })

    } catch (error) {
        console.error(error)
        return false
    }
}

export const loadTrackById = async (id: string) => {

    try {

        if (!id) return null

        const reference = doc(await Firebase.getFirestore(), `tracks/${id}`)
        const data = await getDoc(reference)

        if (!data.exists()) return null

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
            collection(await Firebase.getFirestore(), 'tracks'),
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
            collection(await Firebase.getFirestore(), 'tracks'),
            where('artistId', '==', artistId)
        );

    const data = await getDocs(querySnapshot)
    return data.docs.map(item => item.data()) as iTrackView[]
}

export const loadTracksByIds = async (ids: string[]) => {

    const querySnapshot =
        query(
            collection(await Firebase.getFirestore(), 'tracks'),
            where('id', 'in', ids)
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

export const updateTracksSearchName = async (trackId: string, searchName: string[]) => {

    const document = doc(await Firebase.getFirestore(), `tracks/${trackId}`)
    await updateDoc(document, { searchName })
}