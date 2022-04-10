import React from 'react'
import { ModalPageHeader, PanelHeaderClose, useAdaptivity, ViewWidth, PanelHeaderEdit, PanelHeaderButton } from '@vkontakte/vkui'
import { Icon24Like, Icon24LikeOutline, Icon24ShareOutline } from '@vkontakte/icons'
import { editTrack } from 'code/tracks/edit-track'
import { observer } from 'mobx-react-lite'
import GlobalStore from 'stores/root/global-store'
import { TrackPageStore } from 'stores/pages/track-page-store'
import { Modal, Global, VK } from 'stores/root-store'

import { iTrackView } from 'types/track'

export interface iProps {

}

const TrackHeader: React.FC<iProps> = () => {

    const { viewWidth } = useAdaptivity()
    const isMobile = viewWidth <= ViewWidth.MOBILE

    const store: TrackPageStore = Modal.activeModalComponent?.modalData?.store

    if(!store || !(store instanceof TrackPageStore)) return null
    if (!store.track || store.loading) return null

    return (
        <ModalPageHeader
            left={isMobile && <PanelHeaderClose onClick={() => Modal.closeModal()} />}
            right={
                <>
                    {VK.validVk &&
                        <PanelHeaderButton onClick={() => store.changeFavourite()}>
                            {store.isFavorite ? <Icon24Like /> : <Icon24LikeOutline />}
                        </PanelHeaderButton>}
                        <PanelHeaderButton onClick={() => store.share()}><Icon24ShareOutline /></PanelHeaderButton>
                    {Global.isAdmin && <PanelHeaderEdit onClick={() => editTrack(store.track)} />}
                </>
            }
        >
            {store.track.artist.name} - {store.track.name}
        </ModalPageHeader>
    )
}

export default observer(TrackHeader)