import React, { useEffect } from 'react'
import { VK } from 'stores/root-store'
import { iTrackView } from 'types/track'

export interface iProps {
    track: iTrackView
}

const Comments: React.FC<iProps> = ({ track }) => {

    useEffect(() => {
        VK.mountComments(track.id)
    }, [track.id])

    return (
        <div id='vk_comments' />
    )
}

export default Comments