import { Router } from 'stores/root-store'

export const openTrack = (trackId: string) => {
    openTrackModal(trackId)
}

export const openTrackModal = (trackId: string) => {
    Router.setActiveStory('tracks', 'track', { trackId })
}