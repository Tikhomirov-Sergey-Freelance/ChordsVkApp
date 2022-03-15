import React from 'react'
import { iTrackView } from 'types/track'
import GlobalStore from '../../stores/global-store'
import ModalPageStore from '../../stores/modal-page-store'

import Track from '../../components/tracks/track-page'
import TrackHeader from '../../components/tracks/track-page/track-header'

const openTrack = (track: iTrackView) => {

    const header = () => <TrackHeader track={track} onClose={() => ModalPageStore.closeModal()} />
    const component = () => <Track track={track} onClose={() => ModalPageStore.closeModal()} />

    const onClose = () => {
        GlobalStore.setActiveStory('tracks')
    }

    ModalPageStore.openModal(component, onClose, header)
}

export default openTrack