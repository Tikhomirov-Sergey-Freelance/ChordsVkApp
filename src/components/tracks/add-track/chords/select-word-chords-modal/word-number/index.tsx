import { FormItem } from '@vkontakte/vkui'
import React from 'react'

import Styled from './styled'

export interface iProps {
    word: string
    number: number
    onChange: (number: number) => void
}

const WordNumber: React.FC<iProps> = ({ word, number, onChange }) => {

    const chars = word.split('')

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