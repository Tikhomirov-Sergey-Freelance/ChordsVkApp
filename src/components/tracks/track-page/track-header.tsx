import React from 'react'
import { ModalPageHeader, PanelHeaderClose, useAdaptivity, ViewWidth, PanelHeaderEdit, PanelHeaderButton } from '@vkontakte/vkui'
import { Icon24Like, Icon24LifebuoyOutline, Icon24LikeOutline } from '@vkontakte/icons'
import { editTrack } from 'code/tracks/edit-track'
import { observer } from 'mobx-react-lite'
import GlobalStore from 'stores/global-store'
import { TrackPageStore } from 'stores/track-page-store'

import { iTrackView } from 'types/track'

export interface iProps {

}

const TrackHeader: React.FC<iProps> = () => {

    const { viewWidth } = useAdaptivity()
    const isMobile = viewWidth <= ViewWidth.MOBILE

    const store: TrackPageStore = GlobalStore.modal.activeModalComponent?.modalData?.store

    if (!store || store.loading) return null

    return (
        <ModalPageHeader
            left={isMobile && <PanelHeaderClose onClick={() => GlobalStore.modal.closeModal()} />}
            right={
                <>
                    {GlobalStore.vk.validVk &&
                        <PanelHeaderButton onClick={() => store.changeFavourite()}>
                            {store.isFavorite ? <Icon24Like /> : <Icon24LikeOutline />}
                        </PanelHeaderButton>}
                    {GlobalStore.isAdmin && <PanelHeaderEdit onClick={() => editTrack(store.track)} />}
                </>
            }
        >
            {store.track.artist.name} - {store.track.name}
        </ModalPageHeader>
    )
}

export default observer(TrackHeader)