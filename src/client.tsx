import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/client'

import 'babel-polyfill'

import App from './App'
import { Root } from 'stores/root-store'
import client from './code/apollo-client'

const init = async () => {

    await Root.loadApp()

    render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
        document.getElementById('root')
    )

    await Root.VkStore.initVk()
}

init()
