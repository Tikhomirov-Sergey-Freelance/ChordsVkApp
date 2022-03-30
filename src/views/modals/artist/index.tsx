import React, { forwardRef } from 'react'
import { ModalPage } from '@vkontakte/vkui'

import ModalPageStore from '../../../stores/root/modal-page-store'

import Artist from '../../../components/artists/artist-page'
import ArtistHeader from '../../../components/artists/artist-page/header'

export default <ModalPage
    id='artist'
    header={<ArtistHeader />}
    settlingHeight={100}
>
    <Artist />
</ModalPage> 