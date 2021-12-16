import React from 'react'
import { renderToString } from 'react-dom/server'
import { SSRWrapper } from '@vkontakte/vkui'

import App from './app'

export default (userAgent, validVk, adminToken) => {

    const jsx = <SSRWrapper userAgent={userAgent}>
        <App/>
    </SSRWrapper>
    const reactHtml = renderToString(jsx)

    return getHtml(reactHtml, { validVk, adminToken })
}

const getHtml = (reactHtml, data) => {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg">
        <title>Аккорды</title>
        <link href="/main.css" rel="stylesheet">
    </head>
    <body>
        <script>
        debugger;
            window['adminToken'] = '${data.adminToken}';
            window['validVk'] = ${data.validVk};
        </script>

        <div id="root" class="vkui__root">${reactHtml}</div> 
        <script src="/main.js"></script>
    </body>
    </html>
    `
}