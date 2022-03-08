import { Group, Header, SimpleCell, Avatar, Text } from '@vkontakte/vkui'
import React from 'react'

import { iTrackView } from 'types/track'

export interface iProps {
    title: string
    tracks: iTrackView[]
}

const TracksList: React.FC<iProps> = ({ title, tracks }) => {

    return (
        <Group header={<Header>Последняя активность</Header>}>

            {
                tracks.map(track => 
                <SimpleCell
                    description={<Text weight='regular'>{track.artist.name}</Text>}
                    before={<Avatar size={32} mode="app" />}
                  >
                    {track.name}
                  </SimpleCell>)
            }

        </Group>
    )
}

export default TracksList