import { doc, setDoc } from 'firebase/firestore'
import { Firebase } from 'stores/root-store'
import { iTrackError } from 'types/track-error'

export const sendTrackError = async (error: iTrackError) => {

    try {

        const document = doc(await Firebase.getFirestore(), `track-errors/${error.id}`)
        setDoc(document, error)

        return true

    } catch (error) {
        return false
    }
}