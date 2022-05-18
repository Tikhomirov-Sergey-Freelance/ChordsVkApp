import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton } from '@vkontakte/vkui'

interface iProps {
    onClose: () => void
    onSelect: (text: string) => void
    defaultText?: string
}

const SelectInputModal: React.FC<iProps> = ({ onSelect, onClose, defaultText }) => {
    
    const [text, changeText] = useState(defaultText)

    return (

        <Group style={{ padding: 10 }}>
        
            <Input value={text} onChange={event => changeText(event.target.value)} maxLength={100} />

            <CellButton centered onClick={() => onSelect(text)}>
                Сохранить
            </CellButton>
        
        </Group>
    )
}

export default SelectInputModal