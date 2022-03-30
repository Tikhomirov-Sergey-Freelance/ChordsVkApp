import React from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem, Select, CustomSelectOption } from '@vkontakte/vkui'

import { notes } from '../../../../code/data/notes'
import Store from '../../../../stores/pages/add-chords-store'

const NotesField: React.FC = observer(() => {

    return (

        <FormItem top='Нота'>

            <Select
                value={Store.note}
                options={notes.map(note => ({ label: note, value: note }))}
                renderOption={({ option, ...restProps }) => (<CustomSelectOption {...restProps} />)}
                onChange={event => Store.changeNote(event.target.value)}
            />

        </FormItem>
    )
})

export default NotesField