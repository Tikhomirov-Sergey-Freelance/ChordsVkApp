import { Modal } from 'stores/root-store'

export const openTrack = (trackId: string) => {
    openTrackModal(trackId)
}

export const openTrackModal = (trackId: string) => {
    Modal.openModal('track', { data: { trackId }, saveHistory: true })
}