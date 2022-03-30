import React from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem, SliderSwitch } from '@vkontakte/vkui'

import { MusicalInstrument } from '../../../../types/global-types'
import Store from '../../../../stores/pages/add-chords-store'

import String from './guitar-string'


const GuitarStringFields: React.FC = observer(() => {

    return (

        <>

            {
                Store.guitarStrings.map(string =>
                    
                    <String
                        key={string.index}
                        fret={string.fret}
                        index={string.index}
                        barre={Store.barre}
                        startFret={Store.startFret}
                        changeFret={(fret) => Store.changeString(string.index, fret)}
                    />)
            }

        </>
    )
})

export default GuitarStringFields