import { Button, PullToRefresh, Group } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import MainPageStore from '../../../stores/pages/main-page-store'

import PanelPreloader from '../../common/preloaders/panel-preloader'
import TrackList from '../../tracks/tracks-list'
import RandomTrackButton from '../random-track-button'
import ProposeTrackButton from '../propose-track-button'

const Tracks: React.FC = () => {

    if (MainPageStore.searchQuery) return null
    if (MainPageStore.loadingTracks || !MainPageStore.loadedTracks) return <PanelPreloader />

    return (
        <>
            <RandomTrackButton />
            <ProposeTrackButton />

            {!!MainPageStore.lastViewedTracks.length && <TrackList tracks={MainPageStore.lastViewedTracks} title='Последние просмотренные треки' />}
            {!!MainPageStore.lastAddedTracks.length && <TrackList tracks={MainPageStore.lastAddedTracks} title='Новые треки' />}

        </>
    )
}

export default observer(Tracks)