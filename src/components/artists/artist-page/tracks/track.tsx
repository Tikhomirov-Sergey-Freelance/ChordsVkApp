import { SimpleCell } from '@vkontakte/vkui'
import { openTrack } from '../../../../code/tracks/open-track'
import React from 'react'
import { iTrackView } from 'types/track'

export interface iProps {
    track: iTrackView
}

const Track: React.FC<iProps> = ({ track }) => {

    const onOpenTrack = () => openTrack(track.id)

    return (
        <SimpleCell
            onClick={onOpenTrack}
        >
            {track.name}
        </SimpleCell>
    )
}

export default Track