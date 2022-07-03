import React from 'react'
import { SimpleCell, Avatar } from '@vkontakte/vkui'

import { openArtist } from '../../code/artist/open-artist'

import { iShortArtist } from 'types/artists'

export interface iProps {
    artist: iShortArtist
}

const Artist: React.FC<iProps> = ({ artist }) => {

    const onOpenArtist = () => openArtist(artist.id)

    return (
        <SimpleCell
            onClick={onOpenArtist}
            before={<Avatar size={32} mode="app" src={artist.artistImage} />}
        >
            {artist.name}
        </SimpleCell>
    )
}

export default Artist