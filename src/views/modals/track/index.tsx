import React, { forwardRef } from 'react'
import { ModalPage } from '@vkontakte/vkui'

import ModalPageStore from '../../../stores/root/modal-page-store'

import Track from '../../../components/tracks/track-page'
import TrackHeader from '../../../components/tracks/track-page/track-header'

export default <ModalPage
    id='track'
    header={<TrackHeader />}
    settlingHeight={100}
    >
    <Track />
</ModalPage>