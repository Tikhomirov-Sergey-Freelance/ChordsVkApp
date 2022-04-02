import { PanelHeader } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

import MainPageStore from '../../stores/pages/main-page-store'

import Tracks from './tracks'

const MainPage: React.FC = () => {

    return (

        <>
            <PanelHeader>Треки</PanelHeader>
            <Tracks />
        </>

    )
}

export default observer(MainPage)