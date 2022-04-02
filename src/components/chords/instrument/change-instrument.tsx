import React from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem, SliderSwitch } from '@vkontakte/vkui'

import { MusicalInstrument } from '../../../types/global-types'
import { Global } from 'stores/root-store'

interface iProps {
    title?: string
}

const InstrumentField: React.FC<iProps> = observer(({ title }) => {

    return (
        <FormItem top={title}>
            <SliderSwitch
                activeValue={Global.currentInstrument}
                onSwitch={ value => Global.changeInstrument(value as MusicalInstrument)}
                options={[
                    {
                        name: 'Гитара',
                        value: 'guitar',
                    },
                    {
                        name: 'Укулеле',
                        value: 'ukulele',
                    },
                ]}
            />
        </FormItem>
    )
})

InstrumentField.defaultProps = {
    title: 'Инструмент'
}

export default InstrumentField