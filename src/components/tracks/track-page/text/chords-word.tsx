import React from 'react'
import { ChordRowWord } from 'types/track'

export interface iProps {
    word: ChordRowWord
}

const ChordsWord: React.FC<iProps> = (props) => {

    let chord 
    let word = props.word

    if(typeof word !== 'string') {
        chord = word.chord
        word = word.word
    }

    return (
        <div className={`chord-word${chord ? ' visible-chord' : ''}`}>
            <span className='word'>{word}</span>
            {chord && <span className='chord' style={{ left: `${chord?.chordCharPosition / 2}rem` }}>
                {chord?.key}
            </span>}    
        </div>
    )
}

export default ChordsWord