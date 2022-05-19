import { Modal, Router } from 'stores/root-store'

export const openArtist = (artistId: string) => {
    openArtistModalPage(artistId)
}

export const openArtistModalPage = (artistId: string) => {
    Router.setActiveStory('tracks', 'artist', { artistId })
}