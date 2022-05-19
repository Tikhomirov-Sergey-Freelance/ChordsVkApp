import TrackPageStore from 'stores/pages/track-page-store'
import { Modal, Router } from 'stores/root-store'

export const openTrack = (trackId: string) => {
    openTrackModal(trackId)
}

export const openTrackModal = (trackId: string, store: TrackPageStore = null) => {
    Router.setActiveStory('tracks', 'track', { trackId })
}