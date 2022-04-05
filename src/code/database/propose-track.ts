import { artistToShortArtist } from 'code/artist/mapper';
import { collection, getDocs, where, query, Query, getDoc, doc, setDoc, updateDoc, runTransaction } from 'firebase/firestore'
import { Firebase } from "stores/root-store"
import { iProposeTrack } from 'types/propose-track'

export const addProposeTrack = async (track: iProposeTrack) => {

    try {

        const document = doc(await Firebase.getFirestore(), `propose-track/${track.id}`)
        setDoc(document, track)
        
        return true

    } catch (error) {
        console.error(error)
        return false
    }
}