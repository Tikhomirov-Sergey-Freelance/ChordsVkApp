import { FormItem, Input } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

export interface iProps {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    title: string
    error?: string
    maxLength?: number
}

const InputControl: React.FC<iProps> = ({ title, value, onChange, error, maxLength }) => {

    return (
        <FormItem 
            top={title}
            status={error ? 'error' : 'default'}
            bottom={error}
         >
            <Input value={value} onChange={onChange} maxLength={maxLength}/>
        </FormItem>
    )
}

InputControl.defaultProps = {
    maxLength: 100
}

export default InputControl