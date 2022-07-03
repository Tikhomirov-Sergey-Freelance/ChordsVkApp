import React, { useEffect } from 'react'
import { PanelHeader, Group } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import ChordsListStore from 'stores/pages/chords-list-store'

import Instrument from '../instrument/change-instrument'
import SelectNote from 'components/common/notes/select-note'
import ChordList from './chord-list'


const ChordsList: React.FC = observer(() => {

    useEffect(() => {
        ChordsListStore.loadChords()
    }, [])

    return (
        <>

            <PanelHeader>Аккорды</PanelHeader>

            <Group>

                <Instrument />
                <SelectNote note={ChordsListStore.note} onChangeNote={ChordsListStore.changeNote} />

            </Group>

            <Group>
                <ChordList />
            </Group>
        </>
    )
})

export default ChordsList