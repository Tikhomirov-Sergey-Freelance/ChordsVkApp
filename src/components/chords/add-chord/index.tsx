import React from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, PanelHeaderClose, View, FormLayout, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit } from '@vkontakte/vkui'

import { notes } from '../../../code/data/notes'
import Store from '../../../stores/pages/add-chords-store'

import HeaderWithBack from '../../vk/layout/header/heade-and-back'
import Canvas from './drawing-fret'
import Instrument from '../instrument/change-instrument'
import Notes from '../../common/notes/select-note'
import Name from './name'
import StartFret from './startFret'
import Barre from './barre'
import GuitarStrings from './guitar-strings'
import SaveButton from './save-button'

const AddChordsForm: React.FC = observer(() => {

    return (
        <FormLayout>
      
            <HeaderWithBack>
                Добавить аккорд
            </HeaderWithBack>

            <Group>

                <Instrument />
                <Notes note={Store.note} onChangeNote={Store.changeNote} />
                <Name />

                <Canvas />

                <SaveButton />

                <StartFret />
                <Barre />
                <GuitarStrings />
                
            </Group>

        </FormLayout >
    )
})

export default AddChordsForm