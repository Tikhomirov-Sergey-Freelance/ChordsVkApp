import React, { useState } from 'react'
import { Group, CellButton } from '@vkontakte/vkui'

import Chords from './chords'

interface iProps {
    onClose: () => void
    onSelect: (chord: string) => void
}

const SelectChordModal: React.FC<iProps> = ({ onSelect, onClose }) => {
    
    const [chord, changeChords] = useState('')

    const selectChord = () => {
        
        if(chord) {
            onSelect(chord)
        }

        onClose()
    }

    return (

        <Group>
        
            <Chords chord={chord} onChange={changeChords} />

            <CellButton centered onClick={selectChord}>
                Выбрать
            </CellButton>
        
        </Group>
    )
}

export default SelectChordModal