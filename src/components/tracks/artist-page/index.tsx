import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton, Header, PanelSpinner } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/firebase/chords'
import { iArtist } from 'types/artists'
import ArtistPageStore from 'stores/artist-page-store'
import ModalPageStore from 'stores/modal-page-store'
import { observer } from 'mobx-react-lite'

import Spinner from '../../common/preloaders/panel-preloader'
import Description from './description'
import Tracks from './tracks'

interface iProps {
}

const ArtistModalPage: React.FC<iProps> = () => {

    const store = ModalPageStore.activeModalComponent?.modalData?.store

    if(!store || store.loading) return <Spinner/>

    return (
        <Group>

            <Description store={store} />
            <Tracks store={store} />

        </Group>
    )
}

export default observer(ArtistModalPage)