import React from 'react'
import { Group, Header, CardGrid, Card } from '@vkontakte/vkui'
import { iChord } from '../../../types/chord'

import Chord from './chord'

export interface iProps {
    note: string
    chords: iChord[]
}

const Note: React.FC<iProps> = ({ note, chords }) => {
    
    return (
        <Group header={<Header mode="secondary">{note}</Header>}>
            <CardGrid size='s'>

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