import React from 'react'
import { Button, Footer, ModalCardBase } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import { Router } from 'stores/root-store'

const ShowArtistButton: React.FC = () => {

    const goToArtists = () => {
        Router.setActiveStory('tracks', 'artistList')
    }

    return <Button
        style={{ margin: '10px 0', width: '100%' }}
        size='l'
        mode='outline'
        key='button'
        onClick={goToArtists}>
        Исполнители
    </Button>
}

export default observer(ShowArtistButton) 