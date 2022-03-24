import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton, Header } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/firebase/chords'
import { iChordsWord, iTrackView } from 'types/track'
import TrackPageStore from 'stores/track-page-store'

import Artist from './artist'
import Strumming from './strumming'
import Chords from './chords'
import Text from '././text'
import { observer } from 'mobx-react-lite'

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
  
        </Group>
    )
}

export default observer(SelectChordModal)