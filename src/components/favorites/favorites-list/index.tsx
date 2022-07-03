import { PanelHeader, Group } from '@vkontakte/vkui'
import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import FavoritesPageStore from 'stores/pages/favorites-page-store'

import PanelPreloader from '../../common/preloaders/panel-preloader'

import EmptyList from './empty-list'
import Track from '../../tracks/track'

const FavoritesList: React.FC = () => {

    useEffect(() => {
        FavoritesPageStore.changePageState(true)
        return () => {  FavoritesPageStore.changePageState(false) }
    }, [])
    
    if(FavoritesPageStore.loading || !FavoritesPageStore.loaded) return <PanelPreloader title="Моя коллекция"/>

    if(!FavoritesPageStore.tracks.length) {
        return <EmptyList />
    }

    return (
        <>
            <PanelHeader>Моя коллекция</PanelHeader>

            <Group>

                {
                    FavoritesPageStore.tracks.map(track => <Track key={track.id} track={track} />)
                }

            </Group>
        </>
    )
}

export default observer(FavoritesList)