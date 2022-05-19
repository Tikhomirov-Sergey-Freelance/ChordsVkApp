import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton, PanelSpinner } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/database/chords'
import { iArtist } from 'types/artists'
import GlobalStore from 'stores/root/global-store'
import { observer } from 'mobx-react-lite'
import { Modal } from 'stores/root-store'
import { useArtistStore } from 'stores/pages/artist-page-store/artist-page-store-provider'

import Header from './header'
import Spinner from '../../common/preloaders/panel-preloader'
import Description from './description'
import Tracks from './tracks'

interface iProps {
}

const ArtistModalPage: React.FC<iProps> = () => {

    const store = useArtistStore()

    if(!store.artist || store.loading) return <Spinner/>

    return (

        <>
        
        <Header />

        <Group>

            <Description store={store} />
            <Tracks store={store} />

        </Group>

        </>
    )
}

export default observer(ArtistModalPage)