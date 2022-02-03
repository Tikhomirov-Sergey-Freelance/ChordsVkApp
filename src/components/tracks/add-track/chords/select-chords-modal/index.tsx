import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/firebase/chords'
import { iChordsWord } from 'types/track'

import Chords from './chords'

interface iProps {
    word: iChordsWord
    onClose: () => void
    onChange: (chord: string) => void
}

const SelectChordModal: React.FC<iProps> = ({ onChange, onClose }) => {

    const [chord, changeChords] = useState('')
    const [numberChar, changeNumberChar] = useState(0)

    return (

        <div style={{ height: 300 }}>
            <Chords chord={chord} onChange={changeChords} />
            <Button
                size="l"
                mode="primary"
                onClick={onClose}
            >
                Выбрать
            </Button>
        </div>
    )
}

export default SelectChordModal