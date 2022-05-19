import React from 'react'
import { PanelHeader, PanelHeaderBack, PanelHeaderClose } from '@vkontakte/vkui'
import { Icon24Like, Icon24LikeOutline, Icon24ShareOutline } from '@vkontakte/icons'
import { editTrack } from 'code/tracks/edit-track'
import { observer } from 'mobx-react-lite'
import GlobalStore from 'stores/root/global-store'
import { useTrackStore } from 'stores/pages/track-page-store/track-page-store-provider'
import { Modal, Global, VK, Router } from 'stores/root-store'

export interface iProps {

}

const TrackHeader: React.FC<iProps> = () => {

    const store = useTrackStore()

    if (!store.track || store.loading) return null

    return (
        <PanelHeader
            left={<PanelHeaderBack 
                aria-label='Закрыть'
                onClick={() => Router.goBack()} />}
        >
            {store.track.artist.name} - {store.track.name}
        </PanelHeader>
    )
}

export default observer(TrackHeader)