import TrackPageStore from 'stores/pages/track-page-store'
import { Modal } from 'stores/root-store'

export const openTrack = (trackId: string) => {
    openTrackModal(trackId)
}

export const  openTrackByStore = (trackId: string, store: TrackPageStore) => {
    openTrackModal(trackId, store)
}

export const openTrackModal = (trackId: string, store: TrackPageStore = null) => {
    Modal.openModal('track', { data: { trackId }, saveHistory: true, store })
}