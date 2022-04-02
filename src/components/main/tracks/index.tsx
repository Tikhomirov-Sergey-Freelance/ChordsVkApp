import { Button } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import MainPageStore from '../../../stores/pages/main-page-store'

import PanelPreloader from '../../common/preloaders/panel-preloader'
import TrackList from '../../tracks/tracks-list'

const Tracks: React.FC = () => {

    useEffect(() => {
        MainPageStore.changePageState(true)
        return () => { MainPageStore.changePageState(false) }
    }, [])

    if (MainPageStore.loadingTracks || !MainPageStore.loadedTracks) return <PanelPreloader />

    return (
        <>
            {!!MainPageStore.lastViewedTracks.length && <TrackList tracks={MainPageStore.lastViewedTracks} title='Последние просмотренные треки' />}
            {!!MainPageStore.lastAddedTracks.length && <TrackList tracks={MainPageStore.lastAddedTracks} title='Новые треки' />}
            <Button
                style={{ margin: 10 }}
                stretched={false}
                mode='outline'
                size='l'
                loading={MainPageStore.loadindRandomTrack}
                onClick={() => MainPageStore.openRandomTrack()}
            >
                Случайны трек
            </Button>
        </>
    )
}

export default observer(Tracks)