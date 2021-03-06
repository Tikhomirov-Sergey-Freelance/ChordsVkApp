import React, { ChangeEvent } from 'react'
import { Chip, ChipsInput, FormItem } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import { Icon24AddOutline, Icon24DeleteOutline } from '@vkontakte/icons'

import AddTrackStore from 'stores/pages/add-track-store'
import { showSelectChordModal } from '../../../../code/show-modals/chords/select-chord'

import Styled from './styled'

export interface iProps {
    store: AddTrackStore
}

const Intro: React.FC<iProps> = observer(({ store }) => {

    const addChord = (chord) => {
        store.addIntroItem(chord)
    }

    return (

        <FormItem top="Вступление">

            <ChipsInput

                value={store.intro.map((item, index) => ({ value: item, index }))}
                renderChip={({ value, option, ...rest }) => (
                    <Chip
                        key={option.index}
                        value={value}
                        removable={false}
                        style={{ width: 42 }}
                        {...rest}
                    >
                        {option.value}
                    </Chip>
                )}
                after={
                    <Styled>
                        <Icon24AddOutline onClick={() => showSelectChordModal(addChord)} />
                        <Icon24DeleteOutline onClick={() => store.deleteIntroItem()} />
                    </Styled>
                }
                onInput={(event: ChangeEvent<HTMLInputElement>) => {
                    event.target.value = '' 
                    event.stopPropagation()
                    event.preventDefault()
                }}
            />
 
        </FormItem>
    )
})

export default Intro