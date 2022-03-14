import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/firebase/chords'
import { iChordsWord, iTrackView } from 'types/track'

interface iProps {
    track: iTrackView
    onClose: () => void
}

const SelectChordModal: React.FC<iProps> = ({ track, onClose }) => {

    return (

        <Group>
        
            { track.name }
        
        </Group>
    )
}

export default SelectChordModal