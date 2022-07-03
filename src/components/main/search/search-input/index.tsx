import React from 'react'
import { Group, Search } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import MainPageStore from '../../../../stores/pages/main-page-store'

const SearchInput: React.FC = () => {

    return (
        <Group>
            <Search
                value={MainPageStore.searchQuery}
                onChange={(event) => {
                    const query = event.target.value
                    MainPageStore.onChangeSearch(query)
                }}
            />
        </Group>
    )
}

export default observer(SearchInput)