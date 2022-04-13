import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem, FormField } from '@vkontakte/vkui'

import AddTrackStore from '../../../../stores/pages/add-track-store'
import ModalPageStore from '../../../../stores/root/modal-page-store'
import { iChordsWord } from 'types/track'

import Styled from './styled'
import ChordRow from './chords-row'

interface iProps {
    store: AddTrackStore
}

const Chords: React.FC<iProps> = observer(({ store }) => {

    return (
        <FormItem top='Аккодры'>

            <FormField style={{ margin: 10 }}>
                <Styled>

                    {
                        store.chordsText?.rows.map((row, index) => <ChordRow key={index} rowIndex={index} row={row} store={store} />)
                    }

                </Styled>
            </FormField>
        </FormItem>
    )
})

export default Chords 