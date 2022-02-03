import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem } from '@vkontakte/vkui'

import AddTrackStore from '../../../../stores/add-track-store'
import ModalPageStore from '../../../../stores/modal-page-store'
import { iChordsWord } from 'types/track'

import Styled from './styled'
import ChordRow from './chords-row'

interface iProps {
    store: AddTrackStore
}

const Chords: React.FC<iProps> = observer(({ store }) => {

    const [selectedWord, selectWord] = useState<iChordsWord>(null)

    return (
    <>
        <FormItem top='Аккодры'>

            <Styled> 

                {
                    store.chordsText?.rows.map((row, index) => <ChordRow key={index} words={row.words} showChordsWord={selectWord} />)
                }

            </Styled>
              
        </FormItem>

        </>
    ) 
})

export default Chords 