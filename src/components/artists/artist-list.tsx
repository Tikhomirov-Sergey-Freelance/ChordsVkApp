import React from 'react'
import { Group, Header, SimpleCell, Avatar, Text } from '@vkontakte/vkui'

import { iShortArtist } from 'types/artists'

import Artist from './artist'

export interface iProps {
    title: string
    artists: iShortArtist[]
}

const ArtistList: React.FC<iProps> = ({ title, artists }) => {

    return (
        <Group header={title && <Header>{title}</Header>}>

            {
                artists.map(artist => <Artist key={artist.id} artist={artist} />)
            }

        </Group>
    )
}

export default ArtistList