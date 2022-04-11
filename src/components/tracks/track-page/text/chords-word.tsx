import React from 'react'
import { iChordsWord } from 'types/track'

export interface iProps {
    word: iChordsWord
}

const ChordsWord: React.FC<iProps> = ({ word }) => {

    return (
        <div className={`chord-word${word.chord ? ' visible-chord' : ''}`}>
            <span className='word'>{word.word}</span>
            {word.chord && <span className='chord' style={{ left: `${word.chord?.chordCharPosition / 2}rem` }}>
                {word.chord?.key}
            </span>}    
        </div>
    )
}

export default ChordsWord