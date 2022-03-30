import { PanelHeader } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

import MainPageStore from '../../stores/pages/main-page-store'

import PanelPreloader from '../common/preloaders/panel-preloader'
import Tracks from './tracks'

const MainPage: React.FC = () => {

    if(MainPageStore.loading) return <PanelPreloader title='Треки' />

    return (

        <>
            <PanelHeader>Треки</PanelHeader>
            <Tracks />
        </>

    )
}

export default observer(MainPage)