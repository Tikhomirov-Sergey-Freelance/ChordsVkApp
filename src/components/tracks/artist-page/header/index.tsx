import { ModalPageHeader, PanelHeaderClose, useAdaptivity, ViewWidth, PanelHeaderEdit, Avatar, Div } from '@vkontakte/vkui'
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

    const mobxArtistObject = store.artist as any
    const dataRoute = { 
        track: mobxArtistObject && mobxArtistObject.toJS ? mobxArtistObject.toJS() : mobxArtistObject
     }

    const edit = () => {
        GlobalStore.setActiveStory('admin', 'addTrack', dataRoute)
        ModalPageStore.closeModal('edit')
    }

    if(store.loading) return null

    return (
        <ModalPageHeader
            left={isMobile && <PanelHeaderClose onClick={onClose} />}
            right={GlobalStore.isAdmin && <PanelHeaderEdit onClick={edit}/>}
        >
            <Styled>
                <Avatar size={32} mode="app" src={store.artist.artistImage} className='logo'/>
                {store.artist.name}
            </Styled>
        </ModalPageHeader>
    )
}

export default observer(TrackHeader)