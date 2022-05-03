import { Group } from '@vkontakte/vkui'
import React, { useEffect } from 'react'
import { VK } from 'stores/root-store'
import { iTrackView } from 'types/track'

export interface iProps {
    track: iTrackView
}

const Comments: React.FC<iProps> = ({ track }) => {

    useEffect(() => {

        const modalDiv = document.getElementsByClassName('ModalPage__content')[0]
        let mounted = false

        const action = () => {

            if(!mounted && modalDiv.scrollTop > modalDiv.scrollHeight - modalDiv.clientHeight - 200) {
                
                VK.mountComments(track.id)

                mounted = true
                modalDiv.removeEventListener('scroll', action)
            }
        }

        modalDiv.addEventListener('scroll', action)

        return () => {
            modalDiv.removeEventListener('scroll', action)
        }

    }, [])

    return (
        <Group style={{ padding: 10 }}>
            <div id='vk_comments' style={{ minHeight: 200 }} />
        </Group>
    )
}

export default Comments