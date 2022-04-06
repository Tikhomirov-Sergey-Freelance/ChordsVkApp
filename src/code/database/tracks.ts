import { setTrackSearchName } from 'code/tracks/search-name'
import { trackToShortTrack, trackToShortTrackPartial } from 'code/tracks/track-to-short-track'
import { collection, getDocs, where, query, Query, orderBy, limit, doc, updateDoc, getDoc, setDoc, runTransaction, startAt } from 'firebase/firestore'
import { Firebase } from "stores/root-store"
import { iShortArtist } from 'types/artists'
import { iShortTrack, iShortTrackView, iTrack, iTrackView } from '../../types/track'
import { loadArtistById, loadArtistsByIds, loadShortArtistById } from './artists'
import { updateAfterAddedTrack, loadNextRandomIndex, setNextRandomIndex } from './track-metrics'

export const addTrack = async (track: iTrack) => {

    try {

        const firestore = await Firebase.getFirestore()
        const shortTrack = trackToShortTrack(track)

        await Promise.all([
            setNextRandomIndex(shortTrack),
            setTrackSearchName(shortTrack)
        ])

        await runTransaction(firestore, async transaction => {

            await Promise.all([
                transaction.set(doc(firestore, `tracks/${track.id}`), track),
                transaction.set(doc(firestore, `short-tracks/${track.id}`), shortTrack)
            ])

            await updateAfterAddedTrack(transaction)
        })

        return true

    } catch (error) {
        console.error(error)
        return false
    }
}

export const updateTrack = async (trackId: string, track: Partial<iTrack>) => {

    try {

        track.id = trackId

        const firestore = await Firebase.getFirestore()
        const [shortTrack, needSaveShortTrack] = trackToShortTrackPartial(track)

        if (track.artistId || track.name) {
            await setTrackSearchName(shortTrack as iShortTrack)
        }

        await runTransaction(firestore, async transaction => {

            await transaction.update(doc(firestore, `tracks/${trackId}`), { ...track })

            if (needSaveShortTrack) {
                await transaction.update(doc(firestore, `short-tracks/${trackId}`), { ...shortTrack })
            }

        })

        return true

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
        const artist = await loadShortArtistById(track.artistId)

        return { ...track, artist } as iTrackView

    } catch (error) {
        console.error(error)
        return null
    }
}

export const loadShortTrackById = async (id: string) => {

    try {

        if (!id) return null

        const reference = doc(await Firebase.getFirestore(), `short-tracks/${id}`)
        const data = await getDoc(reference)

        if (!data.exists()) return null

        const track = data?.data() as iShortTrack
        const artist = await loadShortArtistById(track.artistId)

        return { ...track, artist } as iShortTrackView

    } catch (error) {
        console.error(error)
        return null
    }
}

export const loadLastAddedTracks = async (count: number) => {

    const querySnapshot =
        query(
            collection(await Firebase.getFirestore(), 'short-tracks'),
            orderBy('addedDate', 'desc'),
            limit(count)
        );

    const data = await getDocs(querySnapshot)
    const tracks = data.docs.map(item => item.data()) as iShortTrack[]

    const artistsIds = tracks.map(track => track.artistId)
    const artists = await loadArtistsByIds(artistsIds)

    const tracksView: iShortTrackView[] = tracks.map(track => {

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
            collection(await Firebase.getFirestore(), 'short-tracks'),
            where('artistId', '==', artistId)
        );

    const data = await getDocs(querySnapshot)
    return data.docs.map(item => item.data()) as iShortTrackView[]
}

export const loadTracksByIds = async (ids: string[]) => {

    if (!ids.length) return []

    const querySnapshot =
        query(
            collection(await Firebase.getFirestore(), 'short-tracks'),
            where('id', 'in', ids)
        );

    const data = await getDocs(querySnapshot)
    const tracks = data.docs.map(item => item.data()) as iShortTrack[]

    const artistsIds = tracks.map(track => track.artistId)
    const artists = await loadArtistsByIds(artistsIds)

    const tracksView: iShortTrackView[] = tracks.map(track => {

        const artist = artists.find(art => art.id === track.artistId)

        return {
            ...track,
            artist
        }
    })

    return tracksView
}

export const loadRandomTrack = async () => {

    try {

        const count = await loadNextRandomIndex()
        let randomIndex = Math.round(Math.random() * (count - 2)) + 1

        const querySnapshot = query(
            collection(await Firebase.getFirestore(), 'short-tracks'),
            orderBy('randomIndex', 'desc'),
            where('randomIndex', '<=', randomIndex),
            limit(1))

        const data = await getDocs(querySnapshot)

        const track = data.docs[0].data() as iShortTrack

        const artist = await loadShortArtistById(track.id)
        const trackView: iShortTrackView = { ...track, artist }

        return trackView

    } catch (error) {
        console.error(error)
    }
}

export const loadTracksByQuery = async (q: string) => {

    try {

        const firestore = await Firebase.getFirestore()

        const searchByNameWithStartArtist = query(
            collection(firestore, 'short-tracks'),
            where('searchNameStartArtist', '>=', q),
            where('searchNameStartArtist', '<=', q + '\uf8ff'))

        const searchByNameWithEndArtist = query(
            collection(firestore, 'short-tracks'),
            where('searchNameEndArtist', '>=', q),
            where('searchNameEndArtist', '<=', q + '\uf8ff'))

        const results = await Promise.all([
            getDocs(searchByNameWithStartArtist),
            getDocs(searchByNameWithEndArtist)
        ])

        let tracksIds: string[] = []
        let tracks: iShortTrack[] = []

        results.forEach(search => search.docs.forEach(doc => {
            if (!tracksIds.includes(doc.id)) {
                tracksIds.push(doc.id)
                tracks.push(doc.data() as iShortTrack)
            }
        }))

        const artistsIds = tracks.map(track => track.artistId)
        const artists = await loadArtistsByIds(artistsIds)

        const tracksView: iShortTrackView[] = tracks.map(track => {

            const artist = artists.find(art => art.id === track.artistId)

            return {
                ...track,
                artist
            }
        })

        return tracksView

    } catch (error) {
        console.log(error)
        return []
    }
}

export const updateTracksSearchName = async (track: iShortTrack, artist: iShortArtist = null) => {

    try {

        await setTrackSearchName(track, artist)
        await updateDoc(doc(await Firebase.getFirestore(), `short-tracks/${track.id}`), { ...track })
        return true

    } catch (error) {
        console.log(error)
    }
}

