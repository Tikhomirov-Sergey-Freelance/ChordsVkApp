import React from 'react'
import { render } from 'react-dom'

import 'babel-polyfill'

import App from './App'
import { Root } from 'stores/root-store'

const init = async () => {
    
    await Root.loadApp()
    
    render(
        <App />,
        document.getElementById('root')
    )

    await Root.VkStore.initVk()
}

init()
