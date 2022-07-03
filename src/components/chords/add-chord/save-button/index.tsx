import React from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton  } from '@vkontakte/vkui'

import Store from '../../../../stores/pages/add-chords-store'

const SaveButton: React.FC = observer(() => {

    return (

        <CellButton centered onClick={Store.saveChord}> 
                Сохранить аккорд
        </CellButton>
    )
})

export default SaveButton