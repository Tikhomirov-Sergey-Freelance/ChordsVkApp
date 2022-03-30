import React from 'react'
import AddTrackStore from 'stores/pages/add-track-store'

import { Modal } from 'stores/root-store'
import { iChordsWord, iChordWordPosition } from '../../../../types/track'

import SelectChordsModal from './select-chords-modal'
import ChordsWord from './chords-word'

export interface iProps {
    words: iChordsWord[]
    spaceRow: boolean
    rowIndex: number
    store: AddTrackStore
}

const ChordsRow: React.FC<iProps> = (props) => {

    const showChordsModal = (word: iChordsWord, wordIndex: number) => {

        const changeChord = (chord: string, chordCharPosition: number) => {
            const chordWord: iChordWordPosition = { key: chord, chordCharPosition }
            props.store.changeChordWord(props.rowIndex, wordIndex, chordWord)
        }

        const component = () => <SelectChordsModal word={word} onChange={changeChord} onClose={() => Modal.closeModal()} />
        Modal.openModal('defaultModalPage', { component })
    }

    return (
        <div className={`chord-row${props.spaceRow ? ' space-row' : ''}`}>
            {
                props.words.map((word, index) => <ChordsWord
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