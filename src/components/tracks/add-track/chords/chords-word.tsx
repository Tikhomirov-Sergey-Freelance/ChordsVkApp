import React from 'react'
import { iChordsWord } from 'types/track'

export interface iProps {
    word: iChordsWord
    selectWord: () => void
    deleteWord: () => void
}

const ChordsWord: React.FC<iProps> = ({ word, selectWord, deleteWord }) => {

    return (
        <div className='chord-word'>
            <span className='word' onClick={word.chord ? deleteWord : selectWord}>{word.word}</span>
            {word.chord && <span className='chord' style={{ left: `${word.chord?.chordCharPosition / 2}rem` }}>
                {word.chord?.key}
            </span>}    
        </div>
    )
}

export default ChordsWord