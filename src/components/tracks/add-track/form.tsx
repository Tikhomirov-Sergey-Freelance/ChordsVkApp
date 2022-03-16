import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit, Input } from '@vkontakte/vkui'

import { useAddTrackStore } from 'stores/add-track-store/add-track-store-provider'
import Artist from './artist'
import Strumming from './strumming'
import InputControl from '../../common/vk/controls/input-control'
import Text from './text'
import Chords from './chords'

const AddArtistForm: React.FC = observer(() => {

    const store = useAddTrackStore()

    return (

        <Group>

            <InputControl title='Название' value={store.name} onChange={event => store.changeProperty('name', event.target.value)} />
            <Artist store={store} />
            <Strumming store={store} />
            <InputControl title='Примечание к бою' value={store.strummingNote} onChange={event => store.changeProperty('strummingNote', event.target.value)} />
            <Text store={store} />
            <Chords store={store} />
            <InputControl title='Примечание к тексту' value={store.chordsNote} onChange={event => store.changeProperty('chordsNote', event.target.value)} />

            <CellButton centered onClick={() => store.save()}>
                Сохранить трек
            </CellButton>

        </Group>
    )
})

export default AddArtistForm