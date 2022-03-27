import React from 'react'
import { hydrate } from 'react-dom'

import 'babel-polyfill'

import App from './App'
import GlobalStore from 'stores/global-store'
import { SSRWrapper } from '@vkontakte/vkui'

const init = async () => {

    await GlobalStore.loadApp()

    hydrate(
        <App />,
        document.getElementById('root')
    )
}

init()
