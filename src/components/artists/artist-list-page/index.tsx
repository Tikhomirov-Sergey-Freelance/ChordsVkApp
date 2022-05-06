import { FormLayout } from '@vkontakte/vkui'
import HeaderWithBack from 'components/vk/layout/header/heade-and-back'
import React from 'react'

import Page from './page'

const ArtistList: React.FC = () => { 

    return (
        <FormLayout>

                <HeaderWithBack>
                    Исполнители
                </HeaderWithBack>

                <Page />

        </FormLayout>
    )

}

export default ArtistList