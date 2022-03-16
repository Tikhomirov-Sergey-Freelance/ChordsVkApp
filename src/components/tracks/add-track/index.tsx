import React, { useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit, ModalRoot } from '@vkontakte/vkui'

import { notes } from '../../../code/data/notes'
import Store from '../../../stores/add-chords-store'
import { AddTrackStoreProvider } from 'stores/add-track-store/add-track-store-provider'

import HeaderWithBack from '../../vk/layout/header/heade-and-back'
import Form from './form'
import GlobalStore from 'stores/global-store'


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