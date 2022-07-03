import { observer } from 'mobx-react-lite'
import React from 'react'

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