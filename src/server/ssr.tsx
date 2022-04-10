import React from 'react'
import { renderToString } from 'react-dom/server'
import { SSRWrapper } from '@vkontakte/vkui'

import App from '../App'

export default (userAgent, appParams) => {

    const jsx = <SSRWrapper userAgent={userAgent}>
        <App/>
    </SSRWrapper>
    const reactHtml = renderToString(jsx)

    return getHtml(jsx, appParams)
}

const getHtml = (reactHtml, data) => {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg">
        <title>Аккорды</title>
        <link href="/main.css" rel="stylesheet">
        <script src="https://vk.com/js/api/openapi.js?169" type="text/javascript"></script>
    </head>
    <body>
        <script>
            window['firebaseToken'] = '${data.firebaseToken}';
            window['validVk'] = ${data.isValidVk};
            window['vkId'] = ${data.vkId};
            window['isAdmin'] = ${data.isAdmin};
        </script>

        <div id="root" class="vkui__root"></div> 
        <script src="/main.js"></script>
    </body>
    </html>
    `
}