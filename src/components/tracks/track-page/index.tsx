import React from 'react'
import { observer } from 'mobx-react-lite'

import { TrackStoreProvider } from 'stores/pages/track-page-store/track-page-store-provider'

import Page from './page'


const TrackModal: React.FC = () => {

    return (

        <TrackStoreProvider>

            <Page />

        </TrackStoreProvider>
    )
}

export default observer(TrackModal)