import { Modal, Router } from 'stores/root-store'
import { iTrack } from 'types/track'
import { iTrackCandidate } from 'types/track-candidate'

export const addTrackFromCandidate = (track: iTrackCandidate) => {

    const mobxTrackObject = track as any
    const dataRoute = {
        trackCandidate: mobxTrackObject.toJS ? mobxTrackObject.toJS() : mobxTrackObject
    }

    Router.setActiveStory('admin', 'addTrack', dataRoute)
}