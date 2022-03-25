import React from 'react'
import { observer } from 'mobx-react-lite'
import { FormItem, SizeType, Textarea, Group } from '@vkontakte/vkui'
import useDebounce from 'code/hooks/use-debounce'
import InputControl from 'components/common/vk/controls/input-control'
import AddTrackStore from 'stores/add-track-store'

interface iProps {
    store: AddTrackStore
}

const TrackVideo: React.FC<iProps> = ({ store }) => {

    return (

        <div>

            <InputControl title='Ссылка на видео' value={store.trackVideoSrc} onChange={event => store.changeProperty('trackVideoSrc', event.target.value)} />

            {store.trackVideoSrc && <iframe width="100%" src={store.trackVideoSrc} allowFullScreen></iframe>}

        </div>
    ) 
}

export default observer(TrackVideo)

