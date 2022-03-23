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
    store: ArtistPageStore
    onClose: () => void
}

const TrackHeader: React.FC<iProps> = ({ store, onClose }) => {

    const { viewWidth } = useAdaptivity()
    const isMobile = viewWidth <= ViewWidth.MOBILE

    if(store.loading) return null

    return (
        <ModalPageHeader
            left={isMobile && <PanelHeaderClose onClick={onClose} />}
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