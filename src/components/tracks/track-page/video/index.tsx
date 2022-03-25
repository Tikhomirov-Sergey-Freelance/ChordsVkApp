import React from 'react'
import { Group, Header } from '@vkontakte/vkui'

import { iTrackView } from 'types/track'

export interface iProps {
    track: iTrackView
}

const TrackVideo: React.FC<iProps> = ({ track }) => {
    
    if(!track.trackVideoSrc) return null

    return (
        <Group>
            <iframe width="100%" src={track.trackVideoSrc} allowFullScreen></iframe>
        </Group>
    )
}

export default TrackVideo