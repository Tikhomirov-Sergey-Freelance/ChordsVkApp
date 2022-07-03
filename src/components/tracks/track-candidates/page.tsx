import React from 'react'
import { observer } from 'mobx-react-lite'

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