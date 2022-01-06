import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit } from '@vkontakte/vkui'

import { notes } from '../../../code/data/notes'
import Store from '../../../stores/add-chords-store'
import { AddArtistStore } from 'stores/add-artist-store'

import HeaderWithBack from '../../vk/layout/header/heade-and-back'
import Form from './add-artist-form'


const AddArtist: React.FC = observer(() => {

    const [store] = useState(() => new AddArtistStore())

    const ObserverForm = observer<{ store: AddArtistStore }>(({ store }) => {
        return <Form store={store} />
})

    return (
        <FormLayout>
      
            <HeaderWithBack>
                Добавить артиста
            </HeaderWithBack>

            <ObserverForm store={store}/>

        </FormLayout >
    )
})

export default AddArtist