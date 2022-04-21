import { Modal, Router } from 'stores/root-store'
import { iArtist } from 'types/artists'
import { iTrackCandidate } from 'types/track-candidate'

export const addArtistFromTrackCandidate = (trackCandidate: iTrackCandidate) => {

    const mobxObject = trackCandidate as any
    const dataRoute = {
        trackCandidate: mobxObject.toJS ? mobxObject.toJS() : mobxObject
    }
 
    Router.setActiveStory('admin', 'addArtist', dataRoute)
}