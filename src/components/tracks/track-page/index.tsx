import React from 'react'
import { observer } from 'mobx-react-lite'
import { Group } from '@vkontakte/vkui'
import { iChordsWord, iTrackView } from 'types/track'
import TrackPageStore from 'stores/track-page-store'

import Artist from './artist'
import Strumming from './strumming'
import Chords from './chords'
import Text from './text'
import TrackVideo from './video'

interface iProps {
    store: TrackPageStore
    onClose: () => void
}

const SelectChordModal: React.FC<iProps> = ({ store, onClose }) => {

    if(store.loading) return null

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

export default observer(SelectChordModal)