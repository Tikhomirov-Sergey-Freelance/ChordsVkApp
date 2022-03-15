import { InfoRow, SimpleCell } from '@vkontakte/vkui'
import React from 'react'

import { iTrackView } from 'types/track'

export interface iProps {
    track: iTrackView
}

const Artist: React.FC<iProps> = ({ track }) => {

    return (
        <SimpleCell>
            <InfoRow header='Исполнитель'>
                {track.artist.name}
            </InfoRow>
        </SimpleCell>
    )
}

export default Artist