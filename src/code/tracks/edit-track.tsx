import GlobalStore from 'stores/global-store'
import ModalPageStore from 'stores/modal-page-store'
import { iTrack } from 'types/track'

export const editTrack = (track: iTrack) => {

    const mobxTrackObject = track as any
    const dataRoute = {
        track: mobxTrackObject.toJS ? mobxTrackObject.toJS() : mobxTrackObject
    }

    GlobalStore.setActiveStory('admin', 'addTrack', dataRoute)
    ModalPageStore.closeModal('edit')
}