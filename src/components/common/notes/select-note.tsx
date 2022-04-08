import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem, Select, CustomSelectOption } from '@vkontakte/vkui'

import { notes } from '../../../code/data/notes'

export interface iProps {
    note: string
    onChangeNote: (note: string) => void
}

const NoteField: React.FC<iProps> = ({ onChangeNote, note }) => {

    useEffect(() => {
        if(!note) {
            onChangeNote(notes[0])
        }
    }, [])

    const changeNote = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeNote(event.target.value)
    }

    return (

        <FormItem top='Нота'>

            <Select
                value={note || notes[0]}
                options={notes.map(note => ({ label: note, value: note }))}
                renderOption={({ option, ...restProps }) => (<CustomSelectOption {...restProps} />)}
                onChange={changeNote}
            />

        </FormItem>
    )
}

export default NoteField