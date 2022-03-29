import { ModalPageHeader, PanelHeaderClose, useAdaptivity, ViewWidth, PanelHeaderEdit, Avatar, Div } from '@vkontakte/vkui'
import { editArtist } from 'code/artist/edit-artist'
import { observer } from 'mobx-react-lite'
import React from 'react'
import ArtistPageStore from 'stores/artist-page-store'
import GlobalStore from 'stores/global-store'
import ModalPageStore from 'stores/modal-page-store'

import { iArtist } from 'types/artists'
import Styled from './styled'

export interface iProps {

}

const TrackHeader: React.FC<iProps> = () => {

    const { viewWidth } = useAdaptivity()
    const isMobile = viewWidth <= ViewWidth.MOBILE

    const store = GlobalStore.modal.activeModalComponent?.modalData?.store

    if(!store || store.loading) return null

    return (
        <ModalPageHeader
            left={isMobile && <PanelHeaderClose onClick={() => GlobalStore.modal.closeModal()} />}
            right={GlobalStore.isAdmin && <PanelHeaderEdit onClick={() => editArtist(store.artist)}/>}
        >
            <Styled>
                <Avatar size={32} mode="app" src={store.artist.artistImage} className='logo'/>
                {store.artist.name}
            </Styled>
        </ModalPageHeader>
    )
}

export default observer(TrackHeader)