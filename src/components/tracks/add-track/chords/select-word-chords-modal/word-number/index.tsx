import { FormItem } from '@vkontakte/vkui'
import React from 'react'
import { ChordRowWord } from 'types/track'

import Styled from './styled'

export interface iProps {
    word: ChordRowWord
    number: number
    onChange: (number: number) => void
}

const WordNumber: React.FC<iProps> = ({ word, number, onChange }) => {

    const chordWord = typeof word === 'string' ? word : word.word
    const chars = chordWord.split('')

    return (
        <FormItem top='Выберите букву, с которой сменяется аккорд'>
            <Styled>
                {
                    chars.map((char, index) => 
                        <span 
                                key={index}
                                className={`char ${index === number ? 'current' : ''}`}
                                onClick={() => onChange(index)}
                            >
                            {char}
                        </span>)
                }
            </Styled>
        </FormItem>
    )
}

export default WordNumber