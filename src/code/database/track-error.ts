import { artistToShortArtist } from 'code/artist/mapper';
import { collection, getDocs, where, query, Query, getDoc, doc, setDoc, updateDoc, runTransaction } from 'firebase/firestore'
import { Firebase } from "stores/root-store"
import { iProposeTrack } from 'types/propose-track'
import { iTrackError } from 'types/track-error'

export const sendTrackError = async (error: iTrackError) => {

    try {

        const document = doc(await Firebase.getFirestore(), `track-errors/${error.id}`)
        setDoc(document, error)

        return true

    } catch (error) {
        console.error(error)
        return false
    }
}