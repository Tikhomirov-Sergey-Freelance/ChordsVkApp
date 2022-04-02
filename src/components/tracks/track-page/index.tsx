import React from 'react'
import { observer } from 'mobx-react-lite'
import { Group, withModalRootContext, PanelHeader, PanelHeaderClose, PanelHeaderEdit } from '@vkontakte/vkui'
import { iChordsWord, iTrackView } from 'types/track'
import GlobalStore from 'stores/root/global-store'

import Spinner from '../../common/preloaders/panel-preloader'
import Artist from './artist'
import Strumming from './strumming'
import Chords from './chords'
import Intro from './intro'
import Text from './text'
import TrackVideo from './video'
import TrackPageStore from 'stores/pages/track-page-store'
import { Modal } from 'stores/root-store'

interface iProps {

}

const TrackModal: React.FC<iProps> = () => {

    const store: TrackPageStore = Modal.activeModalComponent?.modalData?.store

    if(!store || !(store instanceof TrackPageStore)) return null
    if(!store.track || store.loading) return <Spinner />

    return (

        <Group>
            <Artist track={store.track} />
            <Strumming track={store.track} />
            <Chords chords={store.instrumentChords} loading={store.loadingChords}/>
            <Intro track={store.track}/>
            <Text track={store.track} />
            <TrackVideo track={store.track} />
  
        </Group>
    )
}

export default observer(TrackModal)