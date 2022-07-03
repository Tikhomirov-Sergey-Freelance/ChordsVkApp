import React from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, FormItem, Textarea, SizeType } from '@vkontakte/vkui'

import { useProposeTrackStore } from 'stores/pages/propose-track-store/propose-track-store-provider'
import InputControl from 'components/common/vk/controls/input-control'

const AddArtistForm: React.FC = observer(() => {

    const store = useProposeTrackStore()

    return (

        <Group>

            <InputControl
                title="Исполнитель"
                value={store.artist}
                onChange={event => store.changeProperty('artist', event.target.value)}
                error={store.errors.artist} />

            <InputControl
                title="Трек"
                value={store.track}
                onChange={event => store.changeProperty('track', event.target.value)}
                error={store.errors.track} />

            <FormItem top="Комментарий">
                <Textarea
                    sizeY={SizeType.REGULAR}
                    value={store.comment}
                    maxLength={1000}
                    onChange={(event) => store.changeProperty('comment', event.target.value)} />
            </FormItem>

            <CellButton centered onClick={() => store.save()}>
                Отправить
            </CellButton>

        </Group>
    )
})

export default AddArtistForm