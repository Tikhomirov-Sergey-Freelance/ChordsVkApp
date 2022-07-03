import React from 'react'
import { Button } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import MainPageStore from 'stores/pages/main-page-store'

const RandomTrackButton: React.FC = () => {

    return <Button
        style={{ margin: '10px 0', width: '100%' }}
        mode="outline"
        size="l"
        loading={MainPageStore.loadindRandomTrack}
        onClick={() => MainPageStore.openRandomTrack()}
    >
        Случайный трек
    </Button>
}

export default observer(RandomTrackButton) 