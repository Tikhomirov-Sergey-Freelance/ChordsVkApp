import React from 'react'
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import { useTrackStore } from 'stores/pages/track-page-store/track-page-store-provider'
import { Router } from 'stores/root-store'

export interface iProps {

}

const TrackHeader: React.FC<iProps> = () => {

    const store = useTrackStore()

    if (!store.track || store.loading) return null

    return (
        <PanelHeader
            left={<PanelHeaderBack 
                aria-label="Закрыть"
                onClick={() => Router.goBack()} />}
        >
            {store.track.artist.name} - {store.track.name}
        </PanelHeader>
    )
}

export default observer(TrackHeader)