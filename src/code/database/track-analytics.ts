import { collection, getDocs, where, query, Query, orderBy, limit, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'
import { iTrackAnalytics } from 'types/track-analytics'
import { Firebase } from "stores/root-store"

export const incrementTrackView = async (trackId) => {

    try {

        const reference = doc(await Firebase.getFirestore(), `track-analytics/${trackId}`)
        const data = await getDoc(reference)

        if(data.exists()) {

            const analytics = data.data() as iTrackAnalytics

            const views = analytics.views + 1
            await updateDoc(reference, { views })

        } else {

            const analytics: iTrackAnalytics = {
                id: trackId,
                views: 1
            }

            await setDoc(reference, analytics)
        }

        return true

    } catch(error) {
        console.error(error)
        return false
    }
}

export const changeFavorites = async (trackId, mode: 'increment' | 'decrement') => {

    try {

        const reference = doc(await Firebase.getFirestore(), `track-analytics/${trackId}`)
        const data = await getDoc(reference)

        if(data.exists()) {

            const analytics = data.data() as iTrackAnalytics

            const inFavorites = (analytics.inFavorites || 0) + mode === 'increment' ? 1 : -1
            if(inFavorites < 0) return

            await updateDoc(reference, { inFavorites })

        } else {

            if(mode === 'decrement') return true

            const analytics: iTrackAnalytics = {
                id: trackId,
                views: 0,
                inFavorites: 1
            }

            await setDoc(reference, analytics)
        }

        return true

    } catch(error) {
        console.error(error)
        return false
    }

}