import React from 'react'
import { Group, CardScroll, HorizontalCell, InfoRow, SimpleCell, Spinner, Header, Card } from '@vkontakte/vkui'
import  HorizontalScroll from '../../../common/scrollbar/horizontal-scroll'
import { observer } from 'mobx-react-lite'
import { iChord } from 'types/chord'

import Chord from '../../../chords/chord-card'
import ChangeInstrument from '../../../chords/instrument/change-instrument'

export interface iProps {
    chords: iChord[]
    loading: boolean
}

const Chords: React.FC<iProps> = ({ chords, loading }) => {

    if (loading) {
        return (
            <Group header={<Header mode="secondary">Аккорды</Header>}>
                <div style={{ display: 'flex', margin: 'auto', height: 195, width: '100%' }}>
                    <Spinner size="medium" />
                </div>
            </Group>
        )
    }

    return (
        <Group header={<Header mode="secondary">Аккорды</Header>}>

            <ChangeInstrument />

            <HorizontalScroll
                getScrollToLeft={i => i - 130}
                getScrollToRight={i => i + 130}
            >

                    {
                        chords.map(chord => <Chord key={chord.name} chord={chord} />)
                    }

            </HorizontalScroll>

            
        </Group>
    )
}

export default observer(Chords)