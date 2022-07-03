import { Router } from 'stores/root-store'
import { iTrackCandidate } from 'types/track-candidate'

export const addTrackFromCandidate = (track: iTrackCandidate) => {

    const mobxTrackObject = track as unknown
    const dataRoute = {
        trackCandidate: mobxTrackObject['toJS'] ? mobxTrackObject['toJS']() : mobxTrackObject
    }

    Router.setActiveStory('admin', 'addTrack', dataRoute)
}