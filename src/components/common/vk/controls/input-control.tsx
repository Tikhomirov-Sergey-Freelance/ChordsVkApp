import { FormItem, Input } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

export interface iProps {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    title: string
}

const InputControl: React.FC<iProps> = ({ title, value, onChange }) => {

    return (
        <FormItem top={title}>
            <Input value={value} onChange={onChange} />
        </FormItem>
    )
}

export default InputControl