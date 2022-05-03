import { FormLayout } from '@vkontakte/vkui'
import HeaderWithBack from 'components/vk/layout/header/heade-and-back'
import React from 'react'

import { ArtistListStoreProvider } from 'stores/pages/artist-list-store/artist-list-store-provider'

import Page from './page'

const ArtistList: React.FC = () => { 

    return (
        <FormLayout>

            <ArtistListStoreProvider>

                <HeaderWithBack>
                    Исполнители
                </HeaderWithBack>

                <Page />

            </ArtistListStoreProvider>

        </FormLayout>
    )

}

export default ArtistList