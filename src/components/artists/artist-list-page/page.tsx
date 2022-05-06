import React, { useEffect } from 'react'
import PanelPreloader from '../../common/preloaders/panel-preloader'
import { observer } from 'mobx-react-lite'

import Store from 'stores/pages/artist-list-store'

import Artist from 'components/artists/artist'
import { Group } from '@vkontakte/vkui'

const ArtistList: React.FC = () => {

    useEffect(() => {
        if(!Store.loaded) {
            Store.loadArtists()
        }
    }, [])

    if (!Store.loaded) return <PanelPreloader />

    return (
        <Group>

            {
                Store.artists.map(artist => <Artist key={artist.id} artist={artist} />)
            }

        </Group>
    )
}

export default observer(ArtistList)