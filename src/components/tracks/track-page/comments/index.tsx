import { Group } from '@vkontakte/vkui'
import React, { useEffect } from 'react'
import { VK } from 'stores/root-store'
import { iTrackView } from 'types/track'

export interface iProps {
    track: iTrackView
}

const Comments: React.FC<iProps> = ({ track }) => {

    useEffect(() => {
        setTimeout(() => VK.mountComments(track.id), 2000)
    }, [])

    return (
        <Group style={{ padding: 10 }}>
            <div id='vk_comments' style={{ minHeight: 200 }} />
        </Group>
    )
}

export default Comments