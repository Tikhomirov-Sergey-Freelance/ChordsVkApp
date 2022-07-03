import { CellButton, Group, SizeType, Textarea } from '@vkontakte/vkui'
import React, { useState } from 'react'

export interface iProps {
    sendError: (error: string) => void
    onClose: () => void
}

const TrackError: React.FC<iProps> = ({ sendError }) => {

    const [error, changeText] = useState('')

    return (
        <Group style={{ padding: 10 }} >

            <Textarea
                sizeY={SizeType.REGULAR}
                value={error}
                onChange={(event) => changeText(event.target.value)}
                maxLength={1000} />

            <CellButton centered onClick={() => sendError(error)}>
                Отправить
            </CellButton>

        </Group>
    )
}

export default TrackError