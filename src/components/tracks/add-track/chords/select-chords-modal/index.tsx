import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/firebase/chords'
import { iChordsWord } from 'types/track'

import Chords from './chords'
import WordNumber from './word-number'

interface iProps {
    word: iChordsWord
    onClose: () => void
    onChange: (chord: string, number: number) => void
}

const SelectChordModal: React.FC<iProps> = ({ word, onChange, onClose }) => {

    const [chord, changeChords] = useState('')
    const [numberChar, changeNumberChar] = useState(0)

    const selectChord = () => {
        
        if(chord) {
            onChange(chord, numberChar)
        }

        onClose()
    }

    return (

        <Group>
        
            <Chords chord={chord} onChange={changeChords} />
            <WordNumber word={word.word} number={numberChar} onChange={changeNumberChar} />

            <CellButton centered onClick={selectChord}>
                Выбрать
            </CellButton>
        
        </Group>
    )
}

export default SelectChordModal