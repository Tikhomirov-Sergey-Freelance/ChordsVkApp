import React from 'react'
import { Card, CardScroll, InfoRow, SimpleCell } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import { iChord } from 'types/chord'

import Chord from '../../../chords/chord-card'

export interface iProps {
    chords: iChord[]
}

const Chords: React.FC<iProps> = ({ chords }) => {
debugger
    return (
        <SimpleCell>
            <InfoRow header='Аккорды'>
                <CardScroll size='s'>

                    {
                        chords.map(chord => <Chord chord={chord} />)
                    }

                </CardScroll>
            </InfoRow>
        </SimpleCell>
    )
}

export default observer(Chords)