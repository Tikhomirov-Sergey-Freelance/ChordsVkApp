import { CardGrid, Card } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { Global } from 'stores/root-store'

import PanelPreloader from '../../common/preloaders/panel-preloader'
import ChordsListStore from 'stores/pages/chords-list-store'
import Chord from './chord'

const ChordList: React.FC = () => {

    if (ChordsListStore.loading) return <PanelPreloader />

    return (
        <CardGrid size='s'>

            {
                ChordsListStore.currentNoteChords.map(chord =>
                    <Chord key={chord.name + Global.currentInstrument} chord={chord} />
                )
            }

        </CardGrid>
    )

}

export default observer(ChordList)