import { collection, getDocs, where, query, Query, orderBy, limit, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'
import { iUserFavorite } from 'types/common'
import { iTrackAnalytics } from 'types/track-analytics'
import GlobalStore from '../../stores/global-store'
import { iTrack, iTrackView } from '../../types/track'
import { loadArtistById, loadArtistsByIds } from './artists'
import { changeFavorites } from './track-analytics'
import { snackbar } from '../common/alerts'

export const changeFavorite = async (trackId, mode: 'add' | 'delete') => {

    try {
debugger
        if (!GlobalStore.vk.validVk) return false 

        const vkId = GlobalStore.vk.vkId

        const reference = doc(await GlobalStore.firebase.getFirestore(), `favourites/${vkId}`)
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
        snackbar(mode === 'add' ? 'Трек добавлен в вашу коллекцию' : 'Трек удален из вашей коллекции')

        return true

    } catch (error) {
        console.error(error)
        snackbar(`Ошибка`)
        return false
    }
}

export const getFavoriteTracks = async () => {

    if (!GlobalStore.vk.validVk) return []

    const vkId = GlobalStore.vk.vkId

    const reference = doc(await GlobalStore.firebase.getFirestore(), `favourites/${vkId}`)
    const data = await getDoc(reference)

    if(!data.exists()) return []

    const favorites = data.data() as iUserFavorite
    return favorites.tracks
}

export const isFavoriteTrack = async (trackId) => {
    const favoriteTracks = await getFavoriteTracks()
    return favoriteTracks.includes(trackId)
}