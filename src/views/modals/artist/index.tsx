import React, { forwardRef } from 'react'
import { ModalPage } from '@vkontakte/vkui'

import ModalPageStore from '../../../stores/modal-page-store'

import Artist from '../../../components/tracks/artist-page'
import ArtistHeader from '../../../components/tracks/artist-page/header'

export default <ModalPage
    id='artist'
    header={<ArtistHeader
        store={ModalPageStore.activeModalComponent &&
            ModalPageStore.activeModalComponent.modalData.store}
        onClose={ModalPageStore.activeModalComponent &&
            ModalPageStore.activeModalComponent.modalData.onClose} />}
            settlingHeight={100}
            >
    <Artist
        store={ModalPageStore.activeModalComponent &&
            ModalPageStore.activeModalComponent.modalData.store}
        onClose={ModalPageStore.activeModalComponent &&
            ModalPageStore.activeModalComponent.modalData.onClose} />
</ModalPage> 