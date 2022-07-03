import { collection, getDocs, where, query, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { Firebase } from 'stores/root-store'
import { iTrackCandidate, iTrackCandidatesView, TrackCandidateState } from '../../types/track-candidate'
import { loadArtistsByNames } from './artists'

export const loadActiveCandidatesList = async () => {

    try {

        const querySnapshot =
            query(
                collection(await Firebase.getFirestore(), 'track-candidates'),
                where('state', '==', 'active')
            )

        const data = await getDocs(querySnapshot)
        const tracks = data.docs.map(item => item.data()) as iTrackCandidate[]

        const artistNames = tracks.map(track => track.artist.trim())
        const artists = await loadArtistsByNames(artistNames)
                
        const tracksView = tracks.map(track => {
            const artist = artists.find(artist => artist.name.toUpperCase() === track.artist.toUpperCase().trim())
            return {
                ...track,
                foundArtist: artist
            } as iTrackCandidatesView
        })

        return tracksView

    } catch (error) {
        return []
    }
}

export const addTrackCandidate = async (track: iTrackCandidate) => {

    try {

        const document = doc(await Firebase.getFirestore(), `track-candidates/${track.id}`)
        setDoc(document, track)

        return true

    } catch (error) {
        return false
    }
}

export const deleteTrackCandidate = async (id: string) => {

    try {

        const firestore = await Firebase.getFirestore()

        const document = doc(firestore, `track-candidates/${id}`)
        await deleteDoc(document)

        return true

    } catch (error) {
        return false
    }
}

export const changeTrackCandidateState = async (id: string, state: TrackCandidateState) => {

    try {

        const firestore = await Firebase.getFirestore()

        const document = doc(firestore, `track-candidates/${id}`)
        await updateDoc(document, { state })

        return true

    } catch (error) {
        return false
    }
}

export const changeTrackCandidateAfterSaveTrack = async (id: string, trackId: string) => {

    try {

        const firestore = await Firebase.getFirestore()

        const document = doc(firestore, `track-candidates/${id}`)
        await updateDoc(document, { trackId, state: 'added' })

        return true

    } catch (error) {
        return false
    }

}

