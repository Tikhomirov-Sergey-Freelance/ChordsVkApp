import React from 'react'
import { Group, FormItem } from '@vkontakte/vkui'

import ArtistPageStore from 'stores/artist-page-store'

import Track from './track'
import { observer } from 'mobx-react-lite'

export interface iProps {
    store: ArtistPageStore
}

const Tracks: React.FC<iProps> = ({ store }) => {
    
    if (!store.tracks || !store.tracks.length) return null

    return (
        <FormItem top='Треки исполнителя'>

            {
                store.tracks.map(track => <Track key={track.id} track={track} />)
            }

        </FormItem> 
    )
}

export default observer(Tracks)