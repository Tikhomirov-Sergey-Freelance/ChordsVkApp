import React from 'react'
import { iTrackView } from 'types/track'
import ModalPageStore from '../../stores/modal-page-store'

import Track from '../../components/tracks/track-page'

const openTrack = (track: iTrackView) => {

    const component = () => <Track track={track} onClose={() => ModalPageStore.closeModal()} />
    ModalPageStore.openModal(component, null)
}

export default openTrack