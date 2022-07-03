import React from 'react'
import { observer } from 'mobx-react-lite'
import { FormLayout } from '@vkontakte/vkui'

import { AddTrackStoreProvider } from 'stores/pages/add-track-store/add-track-store-provider'

import HeaderWithBack from '../../vk/layout/header/heade-and-back'
import Form from './form'


const AddTrack: React.FC = observer(() => {

    return (

        <FormLayout>

            <AddTrackStoreProvider>

                <HeaderWithBack>
                    Добавить трек
                </HeaderWithBack>

                <Form />

            </AddTrackStoreProvider>

        </FormLayout>
    )
})

export default AddTrack