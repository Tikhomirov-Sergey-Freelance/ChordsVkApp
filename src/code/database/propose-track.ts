import { doc, setDoc } from 'firebase/firestore'
import { Firebase } from 'stores/root-store'
import { iProposeTrack } from 'types/propose-track'

export const addProposeTrack = async (track: iProposeTrack) => {

    try {

        const document = doc(await Firebase.getFirestore(), `propose-tracks/${track.id}`)
        setDoc(document, track)

        return true

    } catch (error) {
        return false
    }
}