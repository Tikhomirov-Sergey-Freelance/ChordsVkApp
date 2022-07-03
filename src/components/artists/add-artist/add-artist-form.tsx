import React from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, FormItem, Input, Textarea } from '@vkontakte/vkui'

import { useAddArtistStore } from 'stores/pages/add-artist-store/add-artist-store-provider'

import ArtistImage from './artist-image'
import SearchTags from './search-tags'

const AddArtistForm: React.FC = observer(() => {

    const store = useAddArtistStore()

    return (

        <Group>

            <FormItem top="Название">
                <Input
                    value={store.name}
                    onInput={event => store.changeProperty('name', event.currentTarget.value)} />
            </FormItem>

            <ArtistImage />

            <FormItem top="Описание">
                <Textarea
                    value={store.description}
                    onInput={event => store.changeProperty('description', event.currentTarget.value)} />
            </FormItem>

            <SearchTags />

            <CellButton
                centered
                onClick={() => store.save()}>
                Сохранить артиста
            </CellButton>

        </Group>
    )
})

export default AddArtistForm