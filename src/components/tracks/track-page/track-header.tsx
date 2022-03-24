import { ModalPageHeader, PanelHeaderClose, useAdaptivity, ViewWidth, PanelHeaderEdit } from '@vkontakte/vkui'
import { editTrack } from 'code/tracks/edit-track'
import React from 'react'
import GlobalStore from 'stores/global-store'
import ModalPageStore from 'stores/modal-page-store'
import TrackPageStore from 'stores/track-page-store'

import { iTrackView } from 'types/track'

export interface iProps {
    store: TrackPageStore
    onClose: () => void
}

const TrackHeader: React.FC<iProps> = ({ store, onClose }) => {

    const { viewWidth } = useAdaptivity()
    const isMobile = viewWidth <= ViewWidth.MOBILE

    if(store.loading) return null

    return (
        <ModalPageHeader
            left={isMobile && <PanelHeaderClose onClick={onClose} />}
            right={GlobalStore.isAdmin && <PanelHeaderEdit onClick={() => editTrack(store.track)}/>}
        >
            {store.track.artist.name} - {store.track.name}
        </ModalPageHeader>
    )
}

export default TrackHeader