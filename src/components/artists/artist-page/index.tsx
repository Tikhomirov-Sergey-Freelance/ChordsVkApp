import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton, Header, PanelSpinner } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/database/chords'
import { iArtist } from 'types/artists'
import GlobalStore from 'stores/root/global-store'
import { observer } from 'mobx-react-lite'
import { Modal } from 'stores/root-store'
import { ArtistStoreProvider } from 'stores/pages/artist-page-store/artist-page-store-provider'

import Page from './page'

interface iProps {
}

const ArtistModalPage: React.FC<iProps> = () => {

    return (
        <ArtistStoreProvider>

            <Page />

        </ArtistStoreProvider>
    )
}

export default observer(ArtistModalPage)