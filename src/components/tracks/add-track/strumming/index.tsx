import React, { ChangeEvent } from 'react'
import { Chip, ChipsInput, FormItem, Group } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import { Icon24ArrowDownOutline, Icon24ArrowUpOutline, Icon24CheckBoxOff, Icon24CancelOutline } from '@vkontakte/icons'

import AddTrackStore from 'stores/add-track-store'

import Styled from './styled'
import store from 'stores/snackbar'
import { StrummingType } from 'types/strumming'

export interface iProps {
    store: AddTrackStore
}

const Strumming: React.FC<iProps> = observer(({ store }) => {


    const getIcon = (value: StrummingType) => {

        switch (value) {

            case StrummingType.down:
                return <Icon24ArrowDownOutline />

            case StrummingType.up:
                return <Icon24ArrowUpOutline />

            case StrummingType.space:
                return ''
        }
    }

    return (

        <FormItem top='Бой'>

            <ChipsInput

                value={store.strumming.map(item => ({ value: item }))}
                renderChip={({ value, label, option, ...rest }) => (
                    <Chip
                        key={value}
                        value={value}
                        removable={false}
                        style={{ width: 42 }}
                        {...rest}
                    >
                        {getIcon(option.value)}
                    </Chip>
                )}
                after={
                    <Styled>
                        <Icon24ArrowDownOutline onClick={() => store.addStrummingItem(StrummingType.down)} />
                        <Icon24ArrowUpOutline onClick={() => store.addStrummingItem(StrummingType.up)} />
                        <Icon24CheckBoxOff onClick={() => store.addStrummingItem(StrummingType.space)} />
                        <Icon24CancelOutline onClick={() => store.deleteStrummingItem()} />
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

export default Strumming