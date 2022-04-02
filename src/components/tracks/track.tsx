import React, { useMemo } from 'react'
import { SimpleCell, Text, Avatar, IconButton } from '@vkontakte/vkui'
import { Icon24Like, Icon24LikeOutline } from '@vkontakte/icons'

import { Favorites } from 'stores/root-store'
import { openTrack } from '../../code/tracks/open-track'

import { iShortTrackView } from 'types/track'
import { observer } from 'mobx-react-lite'

export interface iProps {
    track: iShortTrackView
}

const Track: React.FC<iProps> = ({ track }) => {

    const onOpenTrack = () => openTrack(track.id)
    const isFavorite = Favorites.favorites.includes(track.id)
    const changeFaforite = (event: React.MouseEvent) => { 
        Favorites.changeFavourite(track.id, isFavorite ? 'delete' : 'add')
        event.preventDefault()
        event.stopPropagation()
    }

    return (
        <SimpleCell
            onClick={onOpenTrack}
            description={<Text weight='regular'>{track.artist.name}</Text>}
            before={<Avatar size={32} mode="app" src={track.artist.artistImage} />}
            after={
                <IconButton onClick={changeFaforite}>
                    {isFavorite ? <Icon24Like/> : <Icon24LikeOutline />}
                </IconButton>
            }
        >
            {track.name}
        </SimpleCell>
    )
}

export default observer(Track)