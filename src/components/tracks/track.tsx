import React from 'react'
import { SimpleCell, Text, Avatar } from '@vkontakte/vkui'

import { openTrack } from '../../code/tracks/open-track'

import { iTrackView } from 'types/track'

export interface iProps {
    track: iTrackView
}

const Track: React.FC<iProps> = ({ track }) => {

    const onOpenTrack = () => openTrack(track)

    return (
        <SimpleCell
            onClick={onOpenTrack}
            description={<Text weight='regular'>{track.artist.name}</Text>}
            before={<Avatar size={32} mode="app" src={track.artist.artistImage} />}
        >
            {track.name}
        </SimpleCell>
    )
}

export default Track