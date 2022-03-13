import { Panel, PanelHeader, View } from '@vkontakte/vkui'
import React, { useEffect } from 'react'
import ChordsList from '../components/chords/chord-list'

const ChordsView: React.FC = () => {

    return (
        <>
            <PanelHeader>Аккорды</PanelHeader>
            <ChordsList />
        </>
    )
}

export default ChordsView