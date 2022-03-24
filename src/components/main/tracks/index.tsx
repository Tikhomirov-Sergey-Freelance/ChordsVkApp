import { PanelSpinner } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import MainPageStore from '../../../stores/main-page-store'

import TrackList from '../../tracks/tracks-list'

const Tracks: React.FC = () => {

    return (
        <>
            {MainPageStore.lastTracks && <TrackList tracks={MainPageStore.lastTracks} title='Новые треки' />}
        </>
    )
}

export default observer(Tracks)