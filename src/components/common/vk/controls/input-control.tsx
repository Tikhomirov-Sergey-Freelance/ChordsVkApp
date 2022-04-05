import { FormItem, Input } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

export interface iProps {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    title: string
    error?: string
}

const InputControl: React.FC<iProps> = ({ title, value, onChange, error }) => {

    return (
        <FormItem 
            top={title}
            status={error ? 'error' : 'default'}
            bottom={error}
         >
            <Input value={value} onChange={onChange} />
        </FormItem>
    )
}

export default InputControl