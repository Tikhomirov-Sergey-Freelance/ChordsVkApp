import React, { useEffect } from 'react'
import { Panel, PanelHeader, View, PanelSpinner, Group } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import ChordsListStore from 'stores/pages/chords-list-store'
import { Global } from 'stores/root-store'

import PanelPreloader from '../../common/preloaders/panel-preloader'
import Instrument from '../instrument/change-instrument'
import SelectNote from 'components/common/notes/select-note'
import Note from '../../chords/chord-list/note'


const ChordsList: React.FC = observer(() => {

    useEffect(() => {
        ChordsListStore.loadChords()
    }, [])

    if (ChordsListStore.loading || !ChordsListStore.loaded) return <PanelPreloader title='Аккорды' />

    return (
        <>

            <PanelHeader>Аккорды</PanelHeader>

            <Group>

                <Instrument />
                <SelectNote note={ChordsListStore.note} onChangeNote={ChordsListStore.changeNote} />

            </Group>

            <Note note={ChordsListStore.note} chords={ChordsListStore.currentNoteChords} />
        </>
    )
})

export default ChordsList