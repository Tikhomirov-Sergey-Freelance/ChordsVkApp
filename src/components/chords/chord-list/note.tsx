import React from 'react'
import { Group, CardGrid } from '@vkontakte/vkui'
import { iChord } from '../../../types/chord'

import Chord from './chord'


export interface iProps {
    note: string
    chords: iChord[]
}

const Note: React.FC<iProps> = ({ chords }) => {
    
    return (
        <Group>
            <CardGrid size="s">

            {
                chords.map(chord => <Chord key={chord.name} chord={chord} />)
            }

            </CardGrid>
        </Group>
    )
}

Note.defaultProps = {
    chords: []
}

export default Note