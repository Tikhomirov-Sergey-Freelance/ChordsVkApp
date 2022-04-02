import { increment, doc, updateDoc, getDoc, setDoc, Transaction } from 'firebase/firestore'
import { iTrackMetrics, iAllTracksInfo, defaultTracksInfo } from 'types/track-metrics'
import { Firebase } from "stores/root-store"

export const incrementTrackView = async (trackId) => {

    try {

        const reference = doc(await Firebase.getFirestore(), `track-metrics/${trackId}`)
        const data = await getDoc(reference)

        if (data.exists()) {

            const analytics = data.data() as iTrackMetrics

            const views = analytics.views + 1
            await updateDoc(reference, { views })

        } else {

            const analytics: iTrackMetrics = {
                id: trackId,
                views: 1
            }

            await setDoc(reference, analytics)
        }

        return true

    } catch (error) {
        console.error(error)
        return false
    }
}

export const changeFavorites = async (trackId, mode: 'increment' | 'decrement') => {

    try {

        const reference = doc(await Firebase.getFirestore(), `track-metrics/${trackId}`)
        const data = await getDoc(reference)

        if (data.exists()) {

            const analytics = data.data() as iTrackMetrics

            const inFavorites = (analytics.inFavorites || 0) + mode === 'increment' ? 1 : -1
            if (inFavorites < 0) return

            await updateDoc(reference, { inFavorites })

        } else {

            if (mode === 'decrement') return true

            const analytics: iTrackMetrics = {
                id: trackId,
                views: 0,
                inFavorites: 1
            }

            await setDoc(reference, analytics)
        }

        return true

    } catch (error) {
        console.error(error)
        return false
    }
}

export const updateAfterAddedTrack = async (transaction: Transaction) => {

    const document = doc(await Firebase.getFirestore(), `track-metrics/all-tracks-info`)

    await transaction.update(document,
        {
            count: increment(1),
            nextRandomIndex: increment(1)
        })
}

export const loadAllTracksInfo = async () => {

    try {

        const reference = doc(await Firebase.getFirestore(), `track-metrics/all-tracks-info`)
        const data = await getDoc(reference)

        if (!data.exists()) {
            return { ...defaultTracksInfo }
        }

        return data.data() as iAllTracksInfo

    } catch (error) {
        console.error(error)
        return null
    }
}

export const loadNextRandomIndex = async () => {
    const info = await loadAllTracksInfo()
    return info.nextRandomIndex
}

export const loadCountTrack = async () => {
    const info = await loadAllTracksInfo()
    return info.count
}





