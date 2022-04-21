import React, { useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit, ModalRoot } from '@vkontakte/vkui'

import { useTrackCandidatesStore } from 'stores/pages/track-candidates-store/track-candidates-store-provider'

import PanelPreloader from 'components/common/preloaders/panel-preloader'
import Track from './track'

const TrackCandidatePage: React.FC = () => {

    const store = useTrackCandidatesStore()

    if(store.loading) return <PanelPreloader />

    return (

        <>
            {
                store.tracks.map(track => <Track key={track.id} track={track} cancellTrack={store.cancellTrack}/>)
            }
        </>    
    )
}
  
export default observer(TrackCandidatePage)    