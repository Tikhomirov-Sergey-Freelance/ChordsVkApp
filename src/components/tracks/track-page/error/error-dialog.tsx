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
        <Group style={{ padding: 10 }} >

            <Textarea sizeY={SizeType.REGULAR} value={error} onChange={(event) => changeText(event.target.value)} maxLength={1000} />

            <CellButton centered onClick={() => sendError(error)}>
                Отправить
            </CellButton>

        </Group>
    )
}

export default TrackError