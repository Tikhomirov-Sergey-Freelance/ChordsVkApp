import React from 'react'
import { Button, Footer, ModalCardBase } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import MainPageStore from 'stores/pages/main-page-store'
import { Router } from 'stores/root-store'
import { toJS } from 'mobx'

const RandomTrackButton: React.FC = () => {

    return <Button
        style={{ margin: 10 }}
        stretched={false}
        mode='outline'
        size='l'
        loading={MainPageStore.loadindRandomTrack}
        onClick={() => MainPageStore.openRandomTrack()}
    >
        Случайный трек
    </Button>
}

export default observer(RandomTrackButton) 