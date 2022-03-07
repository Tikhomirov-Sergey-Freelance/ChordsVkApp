import React from 'react'
import { hydrate } from 'react-dom'

import 'babel-polyfill'

import App from './App'
import { SSRWrapper } from '@vkontakte/vkui'

hydrate(
    <SSRWrapper userAgent={window.navigator.userAgent}>
        <App />,
    </SSRWrapper>,
    document.getElementById('root')
)
