import { Group } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

import MainPageStore from '../../../stores/pages/main-page-store'

import PanelPreloader from '../../common/preloaders/panel-preloader'
import TrackList from '../../tracks/tracks-list'
import RandomTrackButton from '../random-track-button'
import ProposeTrackButton from '../propose-track-button'
import ShowArtistsButton from '../show-artists-button'

const Tracks: React.FC = () => {

    if (MainPageStore.searchQuery) return null
    if (MainPageStore.loadingTracks || !MainPageStore.loadedTracks) return <PanelPreloader />

    return (
        <>

            {!!MainPageStore.lastViewedTracks.length && 
                <TrackList tracks={MainPageStore.lastViewedTracks} title="Последние просмотренные треки" />}
           
            <Group style={{ padding: 10 }}>
                <ShowArtistsButton />
                <RandomTrackButton />
                <ProposeTrackButton />
            </Group>

            {!!MainPageStore.lastAddedTracks.length && 
                <TrackList tracks={MainPageStore.lastAddedTracks} title="Новые треки" />}

        </>
    )
}

export default observer(Tracks)