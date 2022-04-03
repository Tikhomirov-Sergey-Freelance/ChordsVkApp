import { Group, PanelHeader } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import MainPageStore from '../../../stores/pages/main-page-store'

import SearchInput from './search-input'

const Search: React.FC = () => {

    return (

        <>

            <Group>
                <SearchInput />
                {MainPageStore.searchQuery && <span>query {MainPageStore.searchQuery}</span>}
            </Group>
        </>

    )
}

export default observer(Search)