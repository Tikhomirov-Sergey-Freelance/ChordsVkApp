import { Router } from 'stores/root-store'
import { iTrackCandidate } from 'types/track-candidate'

export const addArtistFromTrackCandidate = (trackCandidate: iTrackCandidate) => {

    const mobxObject = trackCandidate as iTrackCandidate & { toJS?:() => unknown }
    const dataRoute = {
        trackCandidate: mobxObject.toJS ? mobxObject.toJS() : mobxObject
    }
 
    Router.setActiveStory('admin', 'addArtist', dataRoute)
}