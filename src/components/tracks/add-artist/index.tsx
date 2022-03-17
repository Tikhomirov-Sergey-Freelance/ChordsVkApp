import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit } from '@vkontakte/vkui'

import { notes } from '../../../code/data/notes'
import Store from '../../../stores/add-chords-store'
import { AddArtistStoreProvider } from 'stores/add-artist-store/add-artist-store-provider'

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