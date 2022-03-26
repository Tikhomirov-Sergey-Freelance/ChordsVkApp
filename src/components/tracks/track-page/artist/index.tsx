import { Avatar, InfoRow, SimpleCell, Group } from '@vkontakte/vkui'
import { openArtist } from 'code/artist/open-artist'
import React from 'react'

import { iTrackView } from 'types/track'

export interface iProps {
    track: iTrackView
}

const Artist: React.FC<iProps> = ({ track }) => {

    return (
        <Group>
            <SimpleCell
                onClick={() => openArtist(track.artist)}
                before={<Avatar size={32} mode="app" src={track.artist.artistImage} />}
            >
                <InfoRow header='Исполнитель'>
                    {track.artist.name}
                </InfoRow>
            </SimpleCell>
        </Group>
    )
}

export default Artist