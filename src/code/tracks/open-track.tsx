import React from 'react'
import { iTrackView } from 'types/track'
import GlobalStore from '../../stores/global-store'
import ModalPageStore from '../../stores/modal-page-store'

import Track from '../../components/tracks/track-page'
import TrackHeader from '../../components/tracks/track-page/track-header'
import TrackPageStore from 'stores/track-page-store'

export const openTrack = (track: iTrackView) => {

    const store = new TrackPageStore(track)
    openTrackModal(store)
}

export const loadAndOpenTrack = (trackId: string) => {

    const store = new TrackPageStore()
    store.loadTrack(trackId)
    openTrackModal(store)
}

export const openTrackModal = (store: TrackPageStore) => {

    const header = () => <TrackHeader store={store} onClose={() => ModalPageStore.closeModal()} />
    const component = () => <Track store={store} onClose={() => ModalPageStore.closeModal()} />

    const onClose = (data) => {debugger
        if(data === 'edit') return
        GlobalStore.setActiveStory('tracks')
    }

    ModalPageStore.openModal(component, onClose, header)
}