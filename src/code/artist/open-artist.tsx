import { Modal } from 'stores/root-store'

export const openArtist = (artistId: string) => {
    openArtistModalPage(artistId)
}

export const openArtistModalPage = (artistId: string) => {
    Modal.openModal('artist', { data: { artistId }, saveHistory: true })
}