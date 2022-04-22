import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/database/chords'
import { ChordRowWord } from 'types/track'

import Chords from './chords'
import WordNumber from './word-number'
import SelectedChord from './selected-chords'

interface iProps {
    word: ChordRowWord
    selectedChords: string[]
    onClose: () => void
    onChange: (chord: string, number: number) => void
}

const SelectChordModal: React.FC<iProps> = ({ word, selectedChords, onChange, onClose }) => {
    
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
            <SelectedChord selectedChords={selectedChords} select={changeChords} />
            <WordNumber word={word} number={numberChar} onChange={changeNumberChar} />

            <CellButton centered onClick={selectChord}>
                Выбрать
            </CellButton>
        
        </Group>
    )
}

export default SelectChordModal