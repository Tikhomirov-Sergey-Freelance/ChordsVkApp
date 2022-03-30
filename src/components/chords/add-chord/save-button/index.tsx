import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem, Select, CustomSelectOption, CellButton  } from '@vkontakte/vkui'

import Store from '../../../../stores/pages/add-chords-store'

const SaveButton: React.FC = observer(() => {

    return (

        <CellButton centered onClick={Store.saveChord}> 
                Сохранить аккорд
        </CellButton>
    )
})

export default SaveButton