import React from 'react'
import { observer } from 'mobx-react-lite'
import InputControl from 'components/common/vk/controls/input-control'
import AddTrackStore from 'stores/pages/add-track-store'

interface iProps {
    store: AddTrackStore
}

const TrackVideo: React.FC<iProps> = ({ store }) => {

    return (

        <div>

            <InputControl
                title="Ссылка на видео"
                value={store.trackVideoSrc}
                onChange={event => store.changeProperty('trackVideoSrc', event.target.value)}
            />

            {store.trackVideoSrc && <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe style={{ maxWidth: 320 }} src={store.trackVideoSrc} allowFullScreen></iframe>
            </div>}

        </div>
    )
}

export default observer(TrackVideo)

