import React from 'react'
import { ChordRowWord, iChordWordPosition } from 'types/track'

export interface iProps {
    word: ChordRowWord
    selectWord: () => void
    deleteWord: () => void
}

const ChordsWord: React.FC<iProps> = ({ word, selectWord, deleteWord }) => {

    let chord: iChordWordPosition
    let chordWord = word

    if(typeof chordWord !== 'string') {
        chord = chordWord.chord
        chordWord = chordWord.word
    }

    return (
        <div className='chord-word'>
            <span className='word' onClick={chord ? deleteWord : selectWord}>{chordWord}</span>
            {chord && <span className='chord' style={{ left: `${chord?.pos / 2}rem` }}>
                {chord?.key}
            </span>}    
        </div>
    )
}

export default ChordsWord