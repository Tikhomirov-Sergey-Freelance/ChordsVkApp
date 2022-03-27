import { ModalPageHeader, PanelHeaderClose, useAdaptivity, ViewWidth, PanelHeaderEdit } from '@vkontakte/vkui'
import { editTrack } from 'code/tracks/edit-track'
import { observer } from 'mobx-react-lite'
import React from 'react'
import GlobalStore from 'stores/global-store'
import ModalPageStore from 'stores/modal-page-store'
import TrackPageStore from 'stores/track-page-store'

import { iTrackView } from 'types/track'

export interface iProps {

}

const TrackHeader: React.FC<iProps> = () => {

    const { viewWidth } = useAdaptivity()
    const isMobile = viewWidth <= ViewWidth.MOBILE

    const store = ModalPageStore.activeModalComponent.modalData.store

    if(!store || store.loading) return null
debugger
    return (
        <ModalPageHeader
            left={isMobile && <PanelHeaderClose onClick={() => ModalPageStore.closeModal()} />}
            right={GlobalStore.isAdmin && <PanelHeaderEdit onClick={() => editTrack(store.track)}/>}
        >
            {store.track.artist.name} - {store.track.name}
        </ModalPageHeader>
    )
}

export default observer(TrackHeader)