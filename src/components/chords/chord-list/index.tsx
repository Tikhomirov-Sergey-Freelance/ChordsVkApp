import { Panel, PanelHeader, View, PanelSpinner } from '@vkontakte/vkui'
import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ChordsListStore from 'stores/chords-list-store'

import PanelPreloader from '../../common/preloaders/panel-preloader'
import Instrument from '../instrument/change-instrument'
import Note from '../../chords/chord-list/note'
import GlobalStore from 'stores/global-store'
import ListVirtualized from '../../common/virtualized/virtualized-list'

const ChordsList: React.FC = observer(() => {

    useEffect(() => {
        ChordsListStore.loadChords()
    }, [])
    
    const chords = GlobalStore.currentInstrument === 'guitar' ? ChordsListStore.guitarChords : ChordsListStore.ukuleleChords
    
    if(!chords || !chords.size) return <PanelPreloader title='Аккорды'/>

    const keys = Array.from(chords.keys())

    return (
        <>

            <PanelHeader>Аккорды</PanelHeader>

            <Instrument />

            {
                keys.map(note => <Note key={note} note={note} chords={chords.get(note)} />)
            }
        </>
    )
})

export default ChordsList