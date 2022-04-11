import React from 'react'
import { Group, CardScroll, HorizontalCell, InfoRow, SimpleCell, Spinner, Header, Card } from '@vkontakte/vkui'
import  HorizontalScroll from '../../../common/scrollbar/horizontal-scroll'
import { observer } from 'mobx-react-lite'
import { Global } from 'stores/root-store'
import { iChord } from 'types/chord'
import { MusicalInstrument } from 'types/global-types'

import Chord from '../../../chords/chord-card'
import ChangeInstrument from '../../../chords/instrument/change-instrument'

export interface iProps {
    chords: iChord[]
    currentInstrument: MusicalInstrument
    loading: boolean
}

const Chords: React.FC<iProps> = ({ chords, currentInstrument, loading }) => {

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

            <ChangeInstrument title='' />

            <HorizontalScroll
                getScrollToLeft={i => i - 130}
                getScrollToRight={i => i + 130}
            >

                    {
                        chords.map(chord => <Chord key={currentInstrument + chord.name} chord={chord} />)
                    }

            </HorizontalScroll>

            
        </Group>
    )
}

export default Chords