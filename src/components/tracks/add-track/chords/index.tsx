import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem } from '@vkontakte/vkui'

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

            <Styled> 

                {
                    store.chordsText?.rows.map((row, index) => <ChordRow key={index} rowIndex={index} words={row.words} spaceRow={row.spaceRow} store={store} />)
                }

            </Styled>
              
        </FormItem>
    ) 
})

export default Chords 