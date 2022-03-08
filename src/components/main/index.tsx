import React from 'react'

import { MainPageStoreProvider } from '../../stores/main-page-store/main-page-provider'

import Tracks from './tracks'

const MainPage: React.FC = () => {

    return (

        <MainPageStoreProvider>
            
            <Tracks />

        </MainPageStoreProvider>
    )
}

export default MainPage