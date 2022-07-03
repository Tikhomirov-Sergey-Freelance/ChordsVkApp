import { makeAutoObservable, reaction } from 'mobx'

import { loadTracksByIds } from '../../code/database/tracks'
import { Favorites } from '../root-store'
import { iShortTrackView } from '../../types/track'
import { changeFavorite } from 'code/database/favorite'

export class FavoritesPageStore {

    loading: boolean
    loaded: boolean
    tracks: iShortTrackView[] = []

    openPage: boolean

    constructor() {
        makeAutoObservable(this)

        reaction(() => Favorites.favorites, this.onChangeFavorites)
        reaction(() => Favorites.loading, this.onChangeFavorites)
        reaction(() => this.openPage, this.onOpenPage)
    }

    async loadTracks() {

        if (Favorites.loading) return

        const unloadedTracks = Favorites.favorites
            .filter(trackId => !this.tracks.some(track => track.id === trackId))
        
        if (unloadedTracks.length) {

            this.loaded = false
            this.loading = true

            const tracks = await loadTracksByIds(unloadedTracks)
            this.deleteNotFoundTracks(unloadedTracks, tracks)

            this.tracks.push(...tracks)
        }

        this.tracks = this.tracks.filter(track => Favorites.favorites.includes(track.id))

        this.loading = false
        this.loaded = true
    }

    onChangeFavorites = () => {
        
        if (this.loaded) {
            this.loaded = false
        }

        if (this.openPage && !this.loaded) {
            this.loadTracks()
        }
    }

    onOpenPage = () => {
        
        if (this.openPage && !this.loaded) {
            this.loadTracks()
        }
    }

    changePageState(open: boolean) {
        this.openPage = open
    }

    deleteNotFoundTracks(ids: string[], foundTracks: iShortTrackView[]) {
        const notFoundTrack = ids.filter(id => !foundTracks.some(track => track.id === id))
        notFoundTrack.forEach(track => changeFavorite(track, 'delete'))
    }
}

const store = new FavoritesPageStore()
export default store
