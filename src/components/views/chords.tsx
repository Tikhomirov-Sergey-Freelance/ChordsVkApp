import { Panel, PanelHeader, View } from '@vkontakte/vkui'
import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ChordsListStore from 'stores/chords-list-store'

const ChordsView: React.FC = observer(() => {

    useEffect(() => {
        ChordsListStore.loadChords()
    }, [])

    const chords = ChordsListStore.chords
    
    if(!chords || !chords.size) return (<> Loading </>)

    const keys = Array.from(chords.keys())

    return (
        <>
            <PanelHeader>Аккорды</PanelHeader>

            {
                keys.map(note => chords.get(note).map(chord => <div>{chord.name}</div>))
            }
        </>
    )

})

export default ChordsView