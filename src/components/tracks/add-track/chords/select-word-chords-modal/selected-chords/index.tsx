import { FormItem } from '@vkontakte/vkui'
import React from 'react'

export interface iProps {
    selectedChords: string[]
    select: (chord: string) => void
}

const SelectedChords: React.FC<iProps> = ({ selectedChords, select }) => {

    if (!selectedChords.length) return null

    return (
        <FormItem top='Аккорды в треке'>

            {
                selectedChords.map((key, index) =>
                    <span
                        style={{
                            cursor: 'pointer',
                            margin: '0 2px'
                        }}
                        key={index}
                        onClick={() => select(key)}
                    >
                        {key}
                    </span>)
            }

        </FormItem>
    )
}

export default SelectedChords