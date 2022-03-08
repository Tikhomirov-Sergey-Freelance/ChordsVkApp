import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CustomSelect, FormItem } from '@vkontakte/vkui'
 
import { AddTrackStore } from 'stores/add-track-store'
import useDebounce from 'code/hooks/use-debounce'
import OptionText from 'components/common/vk/controls/select/option-text'

interface iProps {
    store: AddTrackStore
}

const Artist: React.FC<iProps> = observer(({ store }) => {

    const [query, changeQuery] = useState<string>('')
    const [loadArtists, clearDebounce] = useDebounce(store.loadArtist)

    return (   

        <FormItem top='Исполнитель'> 
              <CustomSelect
                placeholder='Введите исполнителя'
                searchable
                onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const remoteQuery = e.target.value
                    changeQuery(remoteQuery)
                    loadArtists(remoteQuery)
                  } 
                }         
                onClose={() => {
                    clearDebounce()
                    store.artistListLoading = false
                }}
                onChange={event => store.changeProperty('artistId', event.target.value)}
                value={store.artistId}
                filterFn={false}
                options={store.artistsList}
                fetching={store.artistListLoading}
                renderDropdown={(!store.artistListLoading || !query.length) &&
                    (({ defaultDropdownContent }) => 
                    query.length ? defaultDropdownContent : <OptionText>Начните вводить артиста</OptionText>)}
              />
        </FormItem>  
    )
})

export default Artist