import React from 'react'
import { observer } from 'mobx-react-lite'
import { Group, withModalRootContext, PanelHeader, PanelHeaderClose, PanelHeaderEdit } from '@vkontakte/vkui'
import { iChordsWord, iTrackView } from 'types/track'
import { Global, Modal } from 'stores/root-store'

import { useTrackStore } from 'stores/pages/track-page-store/track-page-store-provider'

import Header from './track-header'
import Spinner from '../../common/preloaders/panel-preloader'
import Name from './name'
import Artist from './artist'
import Strumming from './strumming'
import Riff from './riff'
import Chords from './chords'
import Text from './text'
import TrackVideo from './video'
import ErrorButton from './error'

const TrackModal: React.FC = () => {

    const store = useTrackStore()

    if (!store.track || store.loading) return <Spinner />

    return (

        <>

            <Header />

            <Group style={{ paddingBottom: 50 }}>

                <Name store={store} />
                <Artist track={store.track} />
                <Strumming track={store.track} />
                <Riff track={store.track} />
                <Chords chords={store.instrumentChords} currentInstrument={Global.currentInstrument} loading={store.loadingChords} />
                <Text track={store.track} />
                <ErrorButton store={store} />
                <TrackVideo track={store.track} />

            </Group>

        </>
    )
}

export default observer(TrackModal)