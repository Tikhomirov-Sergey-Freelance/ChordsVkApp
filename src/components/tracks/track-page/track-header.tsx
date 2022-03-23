import { ModalPageHeader, PanelHeaderClose, useAdaptivity, ViewWidth, PanelHeaderEdit } from '@vkontakte/vkui'
import { editTrack } from 'code/tracks/edit-track'
import React from 'react'
import GlobalStore from 'stores/global-store'
import ModalPageStore from 'stores/modal-page-store'

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
            right={GlobalStore.isAdmin && <PanelHeaderEdit onClick={() => editTrack(track)}/>}
        >
            {track.artist.name} - {track.name}
        </ModalPageHeader>
    )
}

export default TrackHeader