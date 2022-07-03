import React from 'react'
import { observer } from 'mobx-react-lite'

import { FormItem, FormField } from '@vkontakte/vkui'

import AddTrackStore from '../../../../stores/pages/add-track-store'
import { iChordsRow } from 'types/track'

import Styled from './styled'
import ChordRow from './chords-row'
import SpaceRow from './space-row'
import InstrumentalRow from './instrumental-row'


interface iProps {
    store: AddTrackStore
}

const Chords: React.FC<iProps> = observer(({ store }) => {

    const getRow = (row: iChordsRow, index: number) => {

        if(row.space) {
            return <SpaceRow key={index} rowIndex={index} rows={store.chordsText?.rows} store={store} />
        }

        if(row.instrumental) {
            return <InstrumentalRow key={index} rowIndex={index} row={row} store={store}/>
        }

        return <ChordRow key={index} rowIndex={index} row={row} store={store} />
    }

    return (
        <FormItem top="Аккодры">

            <FormField style={{ margin: 10 }}>
                <Styled>

                    {
                        store.chordsText?.rows.map((row, index) => getRow(row, index))
                    }

                </Styled>
            </FormField>
        </FormItem>
    )
})

export default Chords 