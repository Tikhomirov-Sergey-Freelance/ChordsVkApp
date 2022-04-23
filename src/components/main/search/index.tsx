import { Group, PanelHeader } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import MainPageStore from '../../../stores/pages/main-page-store'

import SearchInput from './search-input'
import SearchResult from './search-result'

const Search: React.FC = () => {

    return (
        <>
            <SearchInput />
            <SearchResult />
        </>
    )
}

export default observer(Search)