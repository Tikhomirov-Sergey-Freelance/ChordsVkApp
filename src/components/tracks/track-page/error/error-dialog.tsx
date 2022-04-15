import { CellButton, Group, Header, SizeType, Textarea } from '@vkontakte/vkui'
import React, { useState } from 'react'
import Chords from '../chords'

export interface iProps {
    sendError: (error: string) => void
    onClose: () => void
}

const TrackError: React.FC<iProps> = ({ sendError, onClose }) => {

    const [error, changeText] = useState('')

    return (
        <Group header={<Header mode="secondary">Пожалуйста, опишите ошибку</Header>}>

            <Textarea sizeY={SizeType.REGULAR} value={error} onChange={(event) => changeText(event.target.value)} />

            <CellButton centered onClick={() => sendError(error)}>
                Отправить
            </CellButton>

        </Group>
    )
}

export default TrackError