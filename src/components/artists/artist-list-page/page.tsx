import React from 'react'
import PanelPreloader from '../../common/preloaders/panel-preloader'
import { observer } from 'mobx-react-lite'

import { useArtistListStore } from 'stores/pages/artist-list-store/artist-list-store-provider'

import Artist from 'components/artists/artist'
import { Group } from '@vkontakte/vkui'

const ArtistList: React.FC = () => {

    const store = useArtistListStore()

    if (store.loading) return <PanelPreloader />

    return (
        <Group>

            {
                store.artists.map(artist => <Artist key={artist.id} artist={artist} />)
            }

        </Group>
    )
}

export default observer(ArtistList)