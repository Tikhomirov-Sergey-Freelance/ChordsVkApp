import React from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem, Select, CustomSelectOption, Input } from '@vkontakte/vkui'

import { notes } from '../../../../code/data/notes'
import Store from '../../../../stores/add-chords-store'

const NameField: React.FC = observer(() => {

    return (
 
        <FormItem top='Название'>
            <Input value={Store.name} onChange={event => Store.changeProperty('name', event.target.value)} />
        </FormItem>
    )
}) 

export default NameField