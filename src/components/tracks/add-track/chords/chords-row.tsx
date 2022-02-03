import React from 'react'

import ModalPageStore from '../../../../stores/modal-page-store'
import { iChordsWord } from '../../../../types/track'

import SelectChordsModal from './select-chords-modal'

export interface iProps {
    words: iChordsWord[]
    showChordsWord: (word: iChordsWord) => void
}

const ChordsRow: React.FC<iProps> = (props) => {

    const showChordsModal = (word: iChordsWord) => {

        const component = () => <SelectChordsModal word={word} onChange={(chord) => { console.log(chord) }} onClose={() => ModalPageStore.closeModal()}/>
        ModalPageStore.openModal(component, null)
    }

    return (
        <div>
            {
                props.words.map(word => <span className='chords-word' onClick={() => showChordsModal(word)}>{word.word}</span>)
            }
        </div>
    )
}

export default ChordsRow