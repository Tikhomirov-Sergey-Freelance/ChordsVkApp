import { ChipsInput, FormItem } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { useAddArtistStore } from 'stores/pages/add-artist-store/add-artist-store-provider'

const SearchTag: React.FC = () => {

    const store = useAddArtistStore()

    return (
        <FormItem top="Теги">
            <ChipsInput
              value={store.tagsOptions}
              onChange={options => {
                  store.changeTags(options.map(option => option.value))
              }}
            />
          </FormItem>
    )
}

export default observer(SearchTag)