import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit, Input } from '@vkontakte/vkui'

import AddArtistStore from '../../../stores/add-artist-store'

export interface iProps {
    store: AddArtistStore
}

const AddArtistForm: React.FC<iProps> = observer(({ store }) => {

    return (

            <Group>

            <FormItem top='Название'>
                <Input value={store.name} onChange={event => store.changeProperty('name', event.target.value)} />
            </FormItem>

            <CellButton centered onClick={() => store.save()}> 
                Сохранить артиста
            </CellButton>
                
            </Group>
    )
})

export default AddArtistForm