import React from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem, SegmentedControl } from '@vkontakte/vkui'

import { MusicalInstrument } from '../../../types/global-types'
import { Global } from 'stores/root-store'

interface iProps {
    title?: string
}

const InstrumentField: React.FC<iProps> = observer(({ title }) => {

    return (
        <FormItem top={title}>
            <SegmentedControl
                value={Global.currentInstrument}
                onChange={ value => Global.changeInstrument(value as MusicalInstrument)}
                options={[
                    {
                        label: 'Гитара',
                        value: 'guitar',
                    },
                    {
                        label: 'Укулеле',
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