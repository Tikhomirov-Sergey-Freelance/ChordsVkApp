import React from 'react'
import { Card, CardScroll, HorizontalCell, InfoRow, SimpleCell } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import { iChord } from 'types/chord'

import Chord from '../../../chords/chord-card'

export interface iProps {
    chords: iChord[]
}

const Chords: React.FC<iProps> = ({ chords }) => {

    return (
        <HorizontalCell>

            {
                chords.map(chord => <Chord chord={chord} />)
            }

        </HorizontalCell>
    )
}

export default observer(Chords)