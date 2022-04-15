import React, { forwardRef } from 'react'
import { ModalPage } from '@vkontakte/vkui'

import ModalPageStore from '../../../stores/root/modal-page-store'

import Snackbar from 'components/common/dialogs/snackbar'
import Track from '../../../components/tracks/track-page'
import TrackHeader from '../../../components/tracks/track-page/track-header'

export default <ModalPage
    key='track'
    id='track'
    header={<TrackHeader />}
    settlingHeight={100}
    >
    <Track />
    <Snackbar place='modal' />
</ModalPage>