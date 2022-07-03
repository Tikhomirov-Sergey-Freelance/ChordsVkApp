import { makeAutoObservable } from 'mobx'
import { changeFavorite, getFavoriteTracks } from 'code/database/favorite'

export class FavoritesStore {

    loading: boolean

    favorites: string[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async loadFavorites() {
        this.loading = true
        this.favorites = await getFavoriteTracks()
        this.loading = false
    }

    async changeFavourite(trackId: string, mode: 'add' | 'delete') {

        if (mode === 'add') {
            this.favorites = [...this.favorites, trackId]
        } else {
            this.favorites = this.favorites.filter(track => track !== trackId)
        }

        const result = await changeFavorite(trackId, mode)

        if (!result) {

            if (mode === 'add') {
                this.favorites = this.favorites.filter(track => track !== trackId)
            } else {
                this.favorites = [...this.favorites, trackId]
            }
        }
    }

    isFavoriteTrack(trackId: string) {
        return this.favorites.includes(trackId)
    }
}

export default FavoritesStore