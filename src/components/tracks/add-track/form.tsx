import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit, Input } from '@vkontakte/vkui'

import AddArtistStore from '../../../stores/add-artist-store'
import AddTrackStore from 'stores/add-track-store'
import Artist from './artist'
import Strumming from './strumming'
import InputControl from '../../common/vk/controls/input-control'
import Text from './text'
import Chords from './chords'

export interface iProps {
    store: AddTrackStore
}

const AddArtistForm: React.FC<iProps> = observer(({ store }) => {

    return (

            <Group>

            <InputControl title='Название' value={store.name} onChange={event => store.changeProperty('name', event.target.value)} />
            <Artist store={store} />
            <Strumming store={store} />
            <InputControl title='Примечание к бою' value={store.strummingNote} onChange={event => store.changeProperty('strummingNote', event.target.value)} />
            <Text store={store} />
            <Chords store={store} />

            <CellButton centered onClick={() => store.save()}> 
                Сохранить трек
            </CellButton>
                
            </Group>
    )
})

export default AddArtistForm