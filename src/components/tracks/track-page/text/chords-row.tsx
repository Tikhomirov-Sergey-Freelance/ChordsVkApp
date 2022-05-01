import React, { useMemo } from 'react'
import AddTrackStore from 'stores/pages/add-track-store'

import ModalPageStore from '../../../../stores/root/modal-page-store'
import { iChordsWord, iChordWordPosition, iChordsRow, ChordRowWord } from '../../../../types/track'

import ChordsWord from './chords-word'

export interface iProps {
    row: iChordsRow
    rowIndex: number
}

const ChordsRow: React.FC<iProps> = ({ row, rowIndex }) => {

    const prepareRow = (words: ChordRowWord[]) => {

        const row = []
        let buffer = []
        let lastChord = false

        words.forEach((word, index) => {

            if(typeof word !== 'string') {

                if(buffer.length) {
                    row.push(<> {buffer.join(' ') + ' '} </>)
                    buffer = []
                }

                if(lastChord) {
                    row.push(<span className='chord-word-space' dangerouslySetInnerHTML={{ __html: '&nbsp;' }} ></span>)
                }

                row.push(<ChordsWord key={`${rowIndex}-${index}`} word={word} />)
                lastChord = true
                return
            }

            buffer.push(word)
            lastChord = false
        })

        if(buffer.length) {
            row.push(<> {buffer.join(' ')} </>)
        }

        return row
    }

    const chordRow = useMemo(() => prepareRow(row.words), [row])

    return (
        <div className='chord-row'>
            <span>{chordRow}</span>
        </div>
    )
}

export default ChordsRow

/*
{
                row.words && row.words.map((word, index) => {
                    return <>
                        <ChordsWord key={`${rowIndex}-${index}`} word={word} />
                        {(index !== row.words.length - 1) && <span className='chord-word-space' dangerouslySetInnerHTML={{ __html: '&nbsp;' }} ></span>}
                    </>
                })
            }
            */