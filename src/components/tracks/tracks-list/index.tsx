import { Group, Header } from '@vkontakte/vkui'
import React from 'react'

import { iShortTrackView } from 'types/track'

import Track from '../track'

export interface iProps {
    title: string
    tracks: iShortTrackView[]
}

const TracksList: React.FC<iProps> = ({ title, tracks }) => {

    return (
        <Group header={title && <Header>{title}</Header>}>

            {
                tracks.map(track => <Track key={track.id} track={track} />)
            }

        </Group>
    )
}

export default TracksList