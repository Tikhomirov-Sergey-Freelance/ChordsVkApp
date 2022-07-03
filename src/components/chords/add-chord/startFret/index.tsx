import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem, Select, CustomSelectOption } from '@vkontakte/vkui'

import Store from '../../../../stores/pages/add-chords-store'

const StartFretField: React.FC = observer(() => {

    const fretsData = useMemo(() => {

        const frets = []

        for(let i = 0; i <= 8; i++) {
            frets.push(i)
        }

        return frets

    }, [])

    return (

        <FormItem top={'Начальный лад'}>

            <Select
                value={Store.startFret}
                options={fretsData.map(fret => ({ label: fret.toString(), value: fret }))}
                renderOption={({ ...restProps }) => (<CustomSelectOption {...restProps} />)}
                onChange={event => Store.changeProperty('startFret', +event.target.value)}
            />
 
        </FormItem>
    )
})

export default StartFretField