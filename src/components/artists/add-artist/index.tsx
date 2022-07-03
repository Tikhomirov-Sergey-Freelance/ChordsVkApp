import React from 'react'
import { observer } from 'mobx-react-lite'
import { FormLayout } from '@vkontakte/vkui'

import { AddArtistStoreProvider } from 'stores/pages/add-artist-store/add-artist-store-provider'

import HeaderWithBack from '../../vk/layout/header/heade-and-back'
import Form from './add-artist-form'

const AddArtist: React.FC = observer(() => {

    return (
        <FormLayout>

            <AddArtistStoreProvider>

                <HeaderWithBack>
                    Добавить артиста
                </HeaderWithBack>

                <Form />

            </AddArtistStoreProvider>

        </FormLayout >
    )
})

export default AddArtist