import React, { useState } from 'react'
import { Group, Search } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import MainPageStore from '../../../../stores/pages/main-page-store'
import useDebounce from '../../../../code/hooks/use-debounce'

const SearchInput: React.FC = () => {

    return (
            <Search
                value={MainPageStore.searchQuery}
                onChange={(event) => {
                    const query = event.target.value
                    MainPageStore.onChangeSearch(query)
                }}
          />
    )
}

export default observer(SearchInput)