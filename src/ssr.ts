import React from 'react'
import { renderToString } from 'react-dom/server'

import App from './app'

export default () => {

    const jsx = React.createElement(App)
    const reactHtml = renderToString(jsx)

    return reactHtml
}