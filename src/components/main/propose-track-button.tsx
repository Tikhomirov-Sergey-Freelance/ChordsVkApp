import React from 'react'
import { Button, Footer, ModalCardBase } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import MainPageStore from 'stores/pages/main-page-store'
import { Router } from 'stores/root-store'
import { toJS } from 'mobx'

const ProposeTrackButton: React.FC = () => {

    const goToPropose = () => {
        const data = { query: toJS(MainPageStore.searchQuery) }
        Router.setActiveStory('tracks', 'proposeTrack', data)
    }

    return <Button
        style={{ margin: 10 }}
        stretched
        size='l'
        mode='outline'
        key='button'
        onClick={goToPropose}>
        Предложить трек
    </Button>
}

export default observer(ProposeTrackButton) 