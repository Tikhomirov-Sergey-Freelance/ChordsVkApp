import { Button, PullToRefresh, Group } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import MainPageStore from '../../../../stores/pages/main-page-store'

import PanelPreloader from '../../../common/preloaders/panel-preloader'
import ArtistList from '../../../artists/artist-list'
import TrackList from '../../../tracks/tracks-list'
import EmptyResult from './empty-result'

const SearchResult: React.FC = () => {

    if (!MainPageStore.searchQuery) return null
    if (MainPageStore.searchLoading) return <PanelPreloader />

    if(!MainPageStore.foundArtists.length && !MainPageStore.foundTracks.length) return <EmptyResult />

    return (
        <>
            {!!MainPageStore.foundArtists.length && <ArtistList artists={MainPageStore.foundArtists} title='Исполнители' />}
            {!!MainPageStore.foundTracks.length && <TrackList tracks={MainPageStore.foundTracks} title='Треки' />}
        </>
    )
}

export default observer(SearchResult)