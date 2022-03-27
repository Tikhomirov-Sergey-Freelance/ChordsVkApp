import React from 'react'
import { observer } from 'mobx-react-lite'
import { Group, withModalRootContext } from '@vkontakte/vkui'
import { iChordsWord, iTrackView } from 'types/track'
import TrackPageStore from '../../../stores/track-page-store'
import ModalPageStore from '../../../stores/modal-page-store'

import Spinner from '../../common/preloaders/panel-preloader'
import Artist from './artist'
import Strumming from './strumming'
import Chords from './chords'
import Text from './text'
import TrackVideo from './video'

interface iProps {

}

const TrackModal: React.FC<iProps> = () => {

    const store = ModalPageStore.activeModalComponent?.modalData.store

    if(!store || store.loading) return null

    return (
        <Group>

            <Artist track={store.track} />
            <Strumming track={store.track} />
            <Chords chords={store.chords} />
            <Text track={store.track} />
            <TrackVideo track={store.track} />
  
        </Group>
    )
}

export default observer(TrackModal)