import React from 'react'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'

import 'babel-polyfill'

import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'
import { AppRoot, Panel, View } from '@vkontakte/vkui'

import App from './app'
 
loadableReady(() => {
    hydrate(
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>
                    <App />
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>,
        document.getElementById('root')
    );
});
