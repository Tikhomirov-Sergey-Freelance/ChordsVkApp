import React from 'react'
import AddTrackStore from 'stores/pages/add-track-store'

import ModalPageStore from '../../../../stores/root/modal-page-store'
import { iChordsWord, iChordWordPosition } from '../../../../types/track'

import ChordsWord from './chords-word'

export interface iProps {
    words: iChordsWord[]
    spaceRow: boolean
    rowIndex: number
}

const ChordsRow: React.FC<iProps> = ({ words, spaceRow, rowIndex }) => {

    return (
        <div className={`chord-row${spaceRow ? ' space-row' : ''}`}>
            {
                words.map((word, index) => <ChordsWord key={`${rowIndex}-${index}`} word={word} />)
            }
        </div>
    )
}

export default ChordsRow