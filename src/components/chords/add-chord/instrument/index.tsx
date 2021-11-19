import React from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem, SliderSwitch } from '@vkontakte/vkui'

import { MusicalInstrument } from '../../../../types/global-types'
import Store from '../../../../stores/add-chords-store'

const InstrumentField: React.FC = observer(() => {

    return (
        <FormItem top='Инструмент'>
            <SliderSwitch
                activeValue={Store.instrument}
                onSwitch={ value => Store.changeInstrtument(value as MusicalInstrument)}
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

export default InstrumentField