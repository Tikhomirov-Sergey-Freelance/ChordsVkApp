import React, { useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit, ModalRoot } from '@vkontakte/vkui'

import { useTrackCandidatesStore } from 'stores/pages/track-candidates-store/track-candidates-store-provider'

import PanelPreloader from 'components/common/preloaders/panel-preloader'

const TrackCandidatePage: React.FC = () => {

    const store = useTrackCandidatesStore()

    if(store.loading) return <PanelPreloader />

    return (

        <>
            {
                store.tracks.map(track => <div>{track.name}</div>)
            }
        </>    
    )
}

export default observer(TrackCandidatePage)