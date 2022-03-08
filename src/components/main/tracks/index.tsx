import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import { useMainPageStore } from '../../../stores/main-page-store/main-page-provider'

import TrackList from './tracks-list'

const Tracks: React.FC = () => {

    const store = useMainPageStore()

    useEffect(() => {
        store.loadLastTracks()
    }, [])

    return (
        <>
            {store.lastTracks && <TrackList tracks={store.lastTracks} title='Новые треки' />}
        </>
    )
}

export default observer(Tracks)