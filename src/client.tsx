import React from 'react'
import { hydrate } from 'react-dom'

import 'babel-polyfill'

import App from './App'

hydrate(
    <App />,
    document.getElementById('root') 
)
