import { setTrackSearchName } from 'code/tracks/search-name'
import { trackToShortTrack, trackToShortTrackPartial } from 'code/tracks/track-to-short-track'
import { collection, getDocs, where, query, Query, orderBy, limit, doc, updateDoc, getDoc, setDoc, runTransaction, startAt } from 'firebase/firestore'
import { Firebase } from "stores/root-store"
import { iShortArtist } from 'types/artists'
import { iTrackCandidate, iTrackCandidatesView } from '../../types/track-candidate'
import { loadArtistsByNames } from './artists'

export const loadCandidatesList = async () => {

    try {

        const querySnapshot =
            query(
                collection(await Firebase.getFirestore(), 'track-candidates'),
                limit(50)
            );

        const data = await getDocs(querySnapshot)
        const tracks = data.docs.map(item => item.data()) as iTrackCandidate[]

        const artistNames = tracks.map(track => track.artist)
        const artists = await loadArtistsByNames(artistNames)

        const tracksView = tracks.map(track => {
            const artist = artists.find(artist => artist.name.toUpperCase() === track.artist.toUpperCase())
            return {
                ...track,
                foundArtist: artist
            } as iTrackCandidatesView
        })

        return tracksView

    } catch (error) {
        console.log(error)
        return []
    }
}