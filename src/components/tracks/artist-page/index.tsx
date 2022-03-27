import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton, Header, PanelSpinner } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/firebase/chords'
import { iArtist } from 'types/artists'
import ArtistPageStore from 'stores/artist-page-store'
import { observer } from 'mobx-react-lite'

import Spinner from '../../common/preloaders/panel-preloader'
import Description from './description'
import Tracks from './tracks'

interface iProps {
    store: ArtistPageStore
    onClose: () => void
}

const SelectChordModal: React.FC<iProps> = ({ store, onClose }) => {

    if(!store || store.loading) return <Spinner/>

    return (
        <Group>

            <Description store={store} />
            <Tracks store={store} />

        </Group>
    )
}

export default observer(SelectChordModal)