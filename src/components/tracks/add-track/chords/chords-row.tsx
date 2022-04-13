import React from 'react'
import AddTrackStore from 'stores/pages/add-track-store'

import { Modal } from 'stores/root-store'
import { iChordsRow, iChordsWord, iChordWordPosition, ChordRowWord } from '../../../../types/track'

import SelectChordsModal from './select-word-chords-modal'
import ChordsWord from './chords-word'

export interface iProps {
    row: iChordsRow
    rowIndex: number
    store: AddTrackStore
}

const ChordsRow: React.FC<iProps> = (props) => {

    const space = props.row.space
    const words = props.row.words

    const showChordsModal = (word: ChordRowWord, wordIndex: number) => {

        const changeChord = (chord: string, pos: number) => {
            const chordWord: iChordWordPosition = { key: chord, pos }
            props.store.changeChordWord(props.rowIndex, wordIndex, chordWord)
        }

        const component = () => <SelectChordsModal word={word} onChange={changeChord} onClose={() => Modal.closeModal()} />
        Modal.openModal('defaultModalPage', { component })
    }

    return (
        <div className={`chord-row${space ? ' space-row' : ''}`}>
            {
                words && words.map((word, index) => <ChordsWord
                    key={index}
                    word={word}
                    selectWord={() => showChordsModal(word, index)}
                    deleteWord={() => props.store.deleteChordWord(props.rowIndex, index)}
                />)
            }
        </div>
    )
}

export default ChordsRow