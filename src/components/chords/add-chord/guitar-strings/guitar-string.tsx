import React, { useMemo, forwardRef } from 'react'
import { observer } from 'mobx-react-lite'
import { CustomSelectOption, FormItem, Select, SliderSwitch } from '@vkontakte/vkui'

import { stringsByCount } from '../../../../code/data/guitar-string'

interface iProps {
    barre: boolean
    startFret: number
    fret: number | string
    index: number
    changeFret: (fret: string) => void
}

const GuitarStringField: React.FC<iProps> = ({ fret, index, barre, startFret, changeFret }) => {
           
    const data = useMemo(() => {

        const start = barre ? startFret + 1 : startFret

        let data = [
            { label: 'Не играется', value: 'notPlayed' },
            { label: 'Открытая', value: startFret }
        ]

        for(let i = start + 1; i <= start + (barre ? 4 : 5); i++) {
            data.push({ label: i.toString(), value: i })
        }

        return data
        
    }, [startFret, barre, fret])

    if(!data.some(item => item.value === fret)) {
        changeFret(data[1].value as any)
    }

    return (
        
        <FormItem top={`${stringsByCount[index]} струна`}>

            <Select
                value={fret}
                options={data}
                renderOption={({ option, ...restProps }) => (<CustomSelectOption {...restProps} />)}
                onChange={event => changeFret(event.target.value)}
            />

        </FormItem>
    )
}

export default GuitarStringField