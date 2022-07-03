import { Modal, Router } from 'stores/root-store'
import { iTrack } from 'types/track'

export const editTrack = (track: iTrack) => {

    const mobxTrackObject = track as unknown
    const dataRoute = {
        track: mobxTrackObject['toJS'] ? mobxTrackObject['toJS']() : mobxTrackObject
    }

    Router.setActiveStory('admin', 'addTrack', dataRoute)
    Modal.closeModal('edit')
}