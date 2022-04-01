import { collection, getDocs, where, query, Query, orderBy, limit, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'
import { iUserFavorite } from 'types/common'
import { Firebase, VK } from "stores/root-store"
import { changeFavorites } from './track-metrics'

export const changeFavorite = async (trackId, mode: 'add' | 'delete') => {

    try {

        if (!VK.validVk) return false 

        const vkId = VK.vkId

        const reference = doc(await Firebase.getFirestore(), `favourites/${vkId}`)
        const data = await getDoc(reference)

        if (data.exists()) {

            const favorites = data.data() as iUserFavorite

            if (mode === 'add') {
                favorites.tracks.push(trackId)
            } else {
                favorites.tracks = favorites.tracks.filter(track => trackId !== track)
            }

            await updateDoc(reference, { tracks: favorites.tracks })

        } else {

            if (mode === 'add') {

                const userFavorite: iUserFavorite = {
                    id: vkId.toString(),
                    tracks: [trackId]
                }

                await setDoc(reference, userFavorite)
            }
        }

        changeFavorites(trackId, mode === 'add' ? 'increment' : 'decrement')
        return true

    } catch (error) {
        console.error(error)
        return false
    }
}

export const getFavoriteTracks = async () => {

    if (!VK.validVk) return []

    const vkId = VK.vkId

    const reference = doc(await Firebase.getFirestore(), `favourites/${vkId}`)
    const data = await getDoc(reference)

    if(!data.exists()) return []

    const favorites = data.data() as iUserFavorite
    return favorites.tracks
}

export const isFavoriteTrack = async (trackId) => {
    const favoriteTracks = await getFavoriteTracks()
    return favoriteTracks.includes(trackId)
}