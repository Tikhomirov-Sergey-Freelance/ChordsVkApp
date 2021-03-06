import React from 'react'
import { ChordRowWord, iChordWordPosition } from 'types/track'

export interface iProps {
    word: ChordRowWord
}

const ChordsWord: React.FC<iProps> = (props) => {

    let chord: iChordWordPosition
    let word = props.word

    if(typeof word !== 'string') {
        chord = word.chord
        word = word.word
    }

    return (
        <span className="chord-word visible-chord">

            <span className="word">{word}</span>
            {chord && <span className="chord" style={{ left: `${chord?.pos / 2}rem` }}>
                {chord?.key}
            </span>} 

        </span>
    )
}

export default ChordsWord