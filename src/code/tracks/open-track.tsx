import React from 'react'
import { iTrackView } from 'types/track'
import GlobalStore from '../../stores/global-store'
import ModalPageStore from '../../stores/modal-page-store'

export const openTrack = (trackId: string) => {
    openTrackModal(trackId)
}

export const openTrackModal = (trackId: string) => {
    ModalPageStore.openModal('track', { data: { trackId } })
}