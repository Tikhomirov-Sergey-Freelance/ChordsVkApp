import React from 'react'
import AddTrackStore from 'stores/pages/add-track-store'

import ModalPageStore from '../../../../stores/root/modal-page-store'
import { iChordsWord, iChordWordPosition, iChordsRow } from '../../../../types/track'

import ChordsWord from './chords-word'

export interface iProps {
    row: iChordsRow
    rowIndex: number
}

const ChordsRow: React.FC<iProps> = ({ row, rowIndex }) => {

    return (
        <div className={`chord-row${row.space ? ' space-row' : ''}`}>
            {
                row.words && row.words.map((word, index) => {
                    return <>
                        <ChordsWord key={`${rowIndex}-${index}`} word={word} />
                        {(index !== row.words.length - 1) && <span className='chord-word-space' dangerouslySetInnerHTML={{ __html: '&nbsp;' }} ></span>}
                    </>
                })
            }
        </div>
    )
}

export default ChordsRow