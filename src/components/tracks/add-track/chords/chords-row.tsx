import React from 'react'

import { iChordsWord } from '../../../../types/track'

export interface iProps {
    words: iChordsWord[]
    showChordsWord: (word: iChordsWord) => void
}

const ChordsRow: React.FC<iProps> = (props) => {

    return (
        <div>
            {
                props.words.map(word => <span className='chords-word' onClick={() => props.showChordsWord(word)}>{word.word}</span>)
            }
        </div>
    )
}

export default ChordsRow