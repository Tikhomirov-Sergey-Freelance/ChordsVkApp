import { makeAutoObservable, reaction } from 'mobx'
import { iTrackView } from 'types/track'
import { iArtist } from 'types/artists'
import { loadArtistById } from 'code/database/artists'
import { loadTracksByArtist, loadTracksByIds } from 'code/database/tracks'
import { changeFavorite, getFavoriteTracks } from 'code/database/favorite'

export class FavoritesStore {

    loadingFavorites: boolean
    loadingTracks: boolean

    favorites: string[] = []
    tracks: iTrackView[]

    constructor() {
        makeAutoObservable(this)
    }

    async loadFavorites() {

        this.loadingFavorites = true
        this.favorites = await getFavoriteTracks()
        this.loadingFavorites = false
    }

    async loadTracks() {

        this.loadingTracks = true

        await this.loadFavorites()
        this.tracks = await loadTracksByIds(this.favorites)

        this.loadingTracks = false
    }

    async changeFavourite(trackId: string, mode: 'add' | 'delete') {

        if (mode === 'add') {
            this.favorites.push(trackId)
        } else {
            this.favorites = this.favorites.filter(track => track !== trackId)
        }

        const result = await changeFavorite(trackId, mode)

        if (!result) {

            if (mode === 'add') {
                this.favorites = this.favorites.filter(track => track !== trackId)
            } else {
                this.favorites.push(trackId)
            }
        }
    }

    get favoritesTracks() {
        return this.tracks.filter(track => this.favorites.includes(track.id))
    }

    isFavoriteTrack(trackId: string) {
        return this.favorites.includes(trackId)
    }
}

export default FavoritesStore