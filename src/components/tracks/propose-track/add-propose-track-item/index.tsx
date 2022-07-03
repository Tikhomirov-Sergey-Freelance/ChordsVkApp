import React from 'react'
import { FormLayout } from '@vkontakte/vkui'

import { ProposeTrackStoreProvider } from 'stores/pages/propose-track-store/propose-track-store-provider'

import HeaderWithBack from '../../../vk/layout/header/heade-and-back'
import Form from './form'


const ProposeTrack: React.FC = () => {

    return (

        <FormLayout>

            <ProposeTrackStoreProvider>

                <HeaderWithBack>
                    Предложить трек
                </HeaderWithBack>

                <Form />

            </ProposeTrackStoreProvider>

        </FormLayout>
    )
}

export default ProposeTrack