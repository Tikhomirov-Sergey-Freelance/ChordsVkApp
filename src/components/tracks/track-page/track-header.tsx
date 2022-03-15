import { ModalPageHeader, PanelHeaderClose, useAdaptivity, ViewWidth } from '@vkontakte/vkui'
import React from 'react'

import { iTrackView } from 'types/track'

export interface iProps {
    track: iTrackView
    onClose: () => void
}

const TrackHeader: React.FC<iProps> = ({ track, onClose }) => {

    const { viewWidth } = useAdaptivity()
    const isMobile = viewWidth <= ViewWidth.MOBILE

    return (
        <ModalPageHeader
            left={isMobile && <PanelHeaderClose onClick={onClose} />}
        >
            {track.artist.name} - {track.name}
        </ModalPageHeader>
    )
}

export default TrackHeader