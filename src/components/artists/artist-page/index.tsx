import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton, Header, PanelSpinner } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/database/chords'
import { iArtist } from 'types/artists'
import GlobalStore from 'stores/root/global-store'
import { observer } from 'mobx-react-lite'
import { Modal } from 'stores/root-store'
import ArtistPageStore from 'stores/pages/artist-page-store'

import Spinner from '../../common/preloaders/panel-preloader'
import Description from './description'
import Tracks from './tracks'

interface iProps {
}

const ArtistModalPage: React.FC<iProps> = () => {

    const store: ArtistPageStore = Modal.activeModalComponent?.modalData?.store

    if(!store || !(store instanceof ArtistPageStore)) return null
    if(!store.artist || store.loading) return <Spinner/>

    return (
        <Group>

            <Description store={store} />
            <Tracks store={store} />

        </Group>
    )
}

export default observer(ArtistModalPage)