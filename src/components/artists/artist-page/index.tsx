import React from 'react'

import { observer } from 'mobx-react-lite'

import { ArtistStoreProvider } from 'stores/pages/artist-page-store/artist-page-store-provider'

import Page from './page'

interface iProps {
}

const ArtistModalPage: React.FC<iProps> = () => {

    return (
        <ArtistStoreProvider>

            <Page />

        </ArtistStoreProvider>
    )
}

export default observer(ArtistModalPage)