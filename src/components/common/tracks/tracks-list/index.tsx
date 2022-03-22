import { Group, Header, SimpleCell, Avatar, Text } from '@vkontakte/vkui'
import React from 'react'

import { iTrackView } from 'types/track'

import Track from '../track'

export interface iProps {
    title: string
    tracks: iTrackView[]
}

const TracksList: React.FC<iProps> = ({ title, tracks }) => {

    return (
        <Group header={<Header>Последняя активность</Header>}>

            {
                tracks.map(track => <Track key={track.id} track={track} />)
            }

        </Group>
    )
}

export default TracksList