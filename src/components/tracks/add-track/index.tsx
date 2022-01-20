import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit } from '@vkontakte/vkui'

import { notes } from '../../../code/data/notes'
import Store from '../../../stores/add-chords-store'
import { AddTrackStore } from 'stores/add-track-store'

import HeaderWithBack from '../../vk/layout/header/heade-and-back'
import Form from './form'


const AddTrack: React.FC = observer(() => {

    const [store] = useState(() => new AddTrackStore())

    const ObserverForm = observer<{ store: AddTrackStore }>(({ store }) => {
        return <Form store={store} />
})

    return (
        <FormLayout>
      
            <HeaderWithBack>
                Добавить трек
            </HeaderWithBack>

            <ObserverForm store={store}/>

        </FormLayout >
    )
})

export default AddTrack