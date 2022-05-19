import { ModalPageHeader, PanelHeader, PanelHeaderBack, useAdaptivity, ViewWidth, PanelHeaderEdit, Avatar, Div } from '@vkontakte/vkui'
import { editArtist } from 'code/artist/edit-artist'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useArtistStore } from 'stores/pages/artist-page-store/artist-page-store-provider'
import GlobalStore from 'stores/root/global-store'
import { Modal, Global, Router } from 'stores/root-store'

import { iArtist } from 'types/artists'
import Styled from './styled'

export interface iProps {

}

const TrackHeader: React.FC<iProps> = () => {

    const store = useArtistStore()

    if (!store.artist || store.loading) return null

    return (
        <PanelHeader
            left={
                <>
                    <PanelHeaderBack onClick={() => Router.goBack()} />
                    {Global.isAdmin && <PanelHeaderEdit onClick={() => editArtist(store.artist)} />}
                </>
            }
        >
            <Styled>
                <Avatar size={32} mode="app" src={store.artist.artistImage} className='logo' />
                {store.artist.name}
            </Styled>
        </PanelHeader>
    )
}

export default observer(TrackHeader)