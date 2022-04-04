import React, { useMemo } from 'react'
import { SimpleCell, Text, Avatar, IconButton } from '@vkontakte/vkui'
import { Icon24Like, Icon24LikeOutline } from '@vkontakte/icons'

import { Favorites } from 'stores/root-store'
import { openArtist } from '../../code/artist/open-artist'

import { iShortTrackView } from 'types/track'
import { observer } from 'mobx-react-lite'
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