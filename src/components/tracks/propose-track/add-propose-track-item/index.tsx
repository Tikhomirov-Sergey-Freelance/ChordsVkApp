import React, { useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit, ModalRoot } from '@vkontakte/vkui'

import { notes } from '../../../../code/data/notes'
import Store from '../../../../stores/pages/add-chords-store'
import { ProposeTrackStoreProvider } from 'stores/pages/propose-track-store/propose-track-store-provider'

import HeaderWithBack from '../../../vk/layout/header/heade-and-back'
import Form from './form'
import GlobalStore from 'stores/root/global-store'


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