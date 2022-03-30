import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Checkbox } from '@vkontakte/vkui'

import Store from '../../../../stores/pages/add-chords-store'

const BarreField: React.FC = observer(() => {

    return (
        <Checkbox checked={Store.barre} onChange={event => Store.changeProperty('barre', !Store.barre)}>Баррэ</Checkbox>
    )
})

export default BarreField