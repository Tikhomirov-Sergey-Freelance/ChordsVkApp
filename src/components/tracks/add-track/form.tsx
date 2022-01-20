import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit, Input } from '@vkontakte/vkui'

import AddArtistStore from '../../../stores/add-artist-store'
import AddTrackStore from 'stores/add-track-store'
import Artist from './artist'

export interface iProps {
    store: AddTrackStore
}

const AddArtistForm: React.FC<iProps> = observer(({ store }) => {

    return (

            <Group>

            <FormItem top='Название'>
                <Input value={store.name} onChange={event => store.changeProperty('name', event.target.value)} />
            </FormItem>

            <Artist store={store} />

            <CellButton centered onClick={() => store.save()}> 
                Сохранить трек
            </CellButton>
                
            </Group>
    )
})

export default AddArtistForm