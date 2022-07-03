import React from 'react'
import { Group, Header } from '@vkontakte/vkui'

import ArtistPageStore from 'stores/pages/artist-page-store'

import Track from './track'
import { observer } from 'mobx-react-lite'

export interface iProps {
    store: ArtistPageStore
}

const Tracks: React.FC<iProps> = ({ store }) => {
    
    if (!store.tracks || !store.tracks.length) return null

    return (
        <Group header={<Header mode="secondary">Треки исполнителя</Header>}>

            {
                store.tracks.map(track => <Track key={track.id} track={track} />)
            }

        </Group> 
    )
}

export default observer(Tracks)