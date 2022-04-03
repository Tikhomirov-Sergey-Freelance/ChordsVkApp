import { Group, PanelHeader } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import MainPageStore from '../../stores/pages/main-page-store'

import Search from './search'
import Tracks from './tracks'

const MainPage: React.FC = () => {

    useEffect(() => {
        MainPageStore.changePageState(true)
        return () => { MainPageStore.changePageState(false) }
    }, [])

    return (

        <>
            <PanelHeader>Треки</PanelHeader>

            <Search />
            <Tracks />
        </>

    )
}

export default observer(MainPage)