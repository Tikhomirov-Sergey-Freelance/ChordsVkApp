import React from 'react'
import { observer } from 'mobx-react-lite'
import { Group, withModalRootContext, PanelHeader, PanelHeaderClose, PanelHeaderEdit } from '@vkontakte/vkui'
import { iChordsWord, iTrackView } from 'types/track'
import { Global, Modal } from 'stores/root-store'

import TrackPageStore from 'stores/pages/track-page-store'

import Spinner from '../../common/preloaders/panel-preloader'
import Artist from './artist'
import Strumming from './strumming'
import Chords from './chords'
import Intro from './intro'
import Text from './text'
import TrackVideo from './video'
import Comments from './comments'

interface iProps {

}

const TrackModal: React.FC<iProps> = () => {

    const store: TrackPageStore = Modal.activeModalComponent?.modalData?.store

    if(!store || !(store instanceof TrackPageStore)) return null
    if(!store.track || store.loading) return <Spinner />

    return (

        <Group style={{ paddingBottom: 50 }}>

            <Artist track={store.track} />
            <Strumming track={store.track} />
            <Chords chords={store.instrumentChords} currentInstrument={Global.currentInstrument} loading={store.loadingChords}/>
            <Intro track={store.track}/>
            <Text track={store.track} />
            <TrackVideo track={store.track} />
            <Comments track={store.track} />

        </Group>
    )
}

export default observer(TrackModal)