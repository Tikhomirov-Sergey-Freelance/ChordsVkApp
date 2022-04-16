import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit, Input } from '@vkontakte/vkui'

import { useAddTrackStore } from 'stores/pages/add-track-store/add-track-store-provider'
import Artist from './artist'
import Strumming from './strumming'
import InputControl from '../../common/vk/controls/input-control'
import Into from './intro'
import Outro from './outro'
import Text from './text'
import Chords from './chords'
import TrackVideo from './video'

const AddArtistForm: React.FC = observer(() => {

    const store = useAddTrackStore()

    return (

        <Group>

            <InputControl title='Название' value={store.name} onChange={event => store.changeProperty('name', event.target.value)} />
            <Artist store={store} />
            <InputControl title='Перебор' value={store.riff} onChange={event => store.changeProperty('riff', event.target.value)} />
            <InputControl title='Примечание к перебору' value={store.riffNote} onChange={event => store.changeProperty('riffNote', event.target.value)} />
            <Strumming store={store} />
            <InputControl title='Примечание к бою' value={store.strummingNote} onChange={event => store.changeProperty('strummingNote', event.target.value)} />
            <Into store={store} />
            <InputControl title='Примечание к вступлению' value={store.introNote} onChange={event => store.changeProperty('introNote', event.target.value)} />
            <Outro store={store}/>
            <InputControl title='Примечание к концовке' value={store.outroNote} onChange={event => store.changeProperty('outroNote', event.target.value)} />
            <Text store={store} />
            <Chords store={store} />
            <InputControl title='Примечание к тексту' value={store.chordsNote} onChange={event => store.changeProperty('chordsNote', event.target.value)} />
            <TrackVideo store={store} />

            <CellButton centered onClick={() => store.save()}>
                Сохранить трек
            </CellButton>

        </Group>
    )
})

export default AddArtistForm