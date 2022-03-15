import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton, Header } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/firebase/chords'
import { iChordsWord, iTrackView } from 'types/track'

import Artist from './artist'
import Strumming from './strumming'
import Text from '././text'

interface iProps {
    track: iTrackView
    onClose: () => void
}

const SelectChordModal: React.FC<iProps> = ({ track, onClose }) => {

    return (
        <Group>

            <Artist track={track} />
            <Strumming track={track} />
            <Text track={track} />
  
        </Group>
    )
}

export default SelectChordModal