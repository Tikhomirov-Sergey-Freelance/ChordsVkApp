import React from 'react'
import { Group } from '@vkontakte/vkui'

import { iTrackView } from 'types/track'

export interface iProps {
    track: iTrackView
}

const TrackVideo: React.FC<iProps> = ({ track }) => {
    
    if(!track.trackVideoSrc) return null

    return (
        <Group>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe style={{ maxWidth: 320 }} src={track.trackVideoSrc} allowFullScreen></iframe>
            </div>
        </Group>
    )
}

export default TrackVideo