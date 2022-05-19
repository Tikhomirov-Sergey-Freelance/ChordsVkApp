import React from 'react'
import { Icon24Like, Icon24LikeOutline, Icon24ShareOutline, Icon24WriteOutline } from '@vkontakte/icons'
import { Avatar, InfoRow, SimpleCell, Group, IconButton } from '@vkontakte/vkui'
import { openArtist } from 'code/artist/open-artist'
import { editTrack } from 'code/tracks/edit-track'

import { Global, VK } from 'stores/root-store'
import { TrackPageStore } from 'stores/pages/track-page-store'

import { observer } from 'mobx-react-lite'

export interface iProps {
    store: TrackPageStore
}

const Name: React.FC<iProps> = ({ store }) => {

    const track = store.track

    return (
        <Group
            
        >
            <SimpleCell
                after={
                    <>
                    {VK.validVk &&
                        <IconButton
                            aria-label={store.isFavorite ? 'Добавить в коллекцию' : 'Удалить из коллекции'}
                            onClick={() => store.changeFavourite()}>
                            {store.isFavorite ? <Icon24Like /> : <Icon24LikeOutline />}
                        </IconButton>}
                        <IconButton onClick={() => store.share()}><Icon24ShareOutline /></IconButton>
                    {Global.isAdmin && <IconButton onClick={() => editTrack(store.track)}><Icon24WriteOutline /></IconButton>}
                </>
                }
            >
                <InfoRow header='Название трека'>
                    {track.name}
                </InfoRow>
            </SimpleCell>
        </Group>
    )
}

export default observer(Name)