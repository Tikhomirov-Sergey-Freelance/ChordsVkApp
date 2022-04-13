import { Avatar, InfoRow, SimpleCell, Group } from '@vkontakte/vkui'
import { openArtist } from 'code/artist/open-artist'
import React from 'react'

import { iTrackView } from 'types/track'

export interface iProps {
    track: iTrackView
}

const Name: React.FC<iProps> = ({ track }) => {

    return (
        <Group>
            <SimpleCell>
                <InfoRow header='Название трека'>
                    {track.name}
                </InfoRow>
            </SimpleCell>
        </Group>
    )
}

export default Name