import { loadShortArtistById } from 'code/database/artists'
import { iShortArtist } from 'types/artists'
import { iShortTrack } from 'types/track'

export const setTrackSearchName = async (track: iShortTrack, artist: iShortArtist = null) => {

    try {

        if (!artist) {
            artist = await loadShortArtistById(track.artistId)
        }

        const artistName = artist.name.toLocaleUpperCase().split(' ').filter(word => word).join(' ')
        const trackName = track.name.toLocaleUpperCase().split(' ').filter(word => word).join(' ')

        track.searchNameStartArtist = `${artistName} ${trackName}`
        track.searchNameEndArtist = `${trackName} ${artistName}`

        return true
    } catch (error) {
        return false
    }
}