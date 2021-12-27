import React from 'react'
import { Group, Header, CardGrid, Card } from '@vkontakte/vkui'
import { iParams as ChordParam } from '../../../stores/add-chords-store'

import Chord from './chord'

export interface iProps {
    note: string
    chords: ChordParam[]
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