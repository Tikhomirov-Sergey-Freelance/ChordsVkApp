import React from 'react'

import ModalPageStore from '../../../../stores/modal-page-store'
import { iChordsWord } from '../../../../types/track'

import SelectChordsModal from './select-chords-modal'

export interface iProps {
    words: iChordsWord[]
    rowIndex: number
    showChordsWord: (word: iChordsWord) => void
}

const ChordsRow: React.FC<iProps> = (props) => {

    const showChordsModal = (word: iChordsWord) => {

        const changeChord = (chord: string, chordCharPosition: number) => {
            word.chord = { key: chord, chordCharPosition }
        }
     
        const component = () => <SelectChordsModal word={word} onChange={changeChord} onClose={() => ModalPageStore.closeModal()}/>
        ModalPageStore.openModal(component, null)
    }

    return (
        <div>
            {
                props.words.map((word, index) => <span key={index} className='chords-word' onClick={() => showChordsModal(word)}>{word.word}{word.chord?.key}{word.chord?.chordCharPosition}</span>)
            }
        </div>
    )
}

export default ChordsRow