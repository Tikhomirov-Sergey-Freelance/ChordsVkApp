import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

import getApp from './ssr'

const app = express()

app.get(/\.(js|css|map|ico)$/, express.static(path.resolve(__dirname, '../build')))

app.use('*', (req, res) => {

    const app = getApp()
    const firebaseToken = '11111'

    let indexHTML = fs.readFileSync(path.resolve(__dirname, '../build/index.html'), {
        encoding: 'utf8',
    })

    indexHTML.replace( '<div id="root"></div>', `<div id="root">${app}</div>`)
    indexHTML.replace('window["firebaseToken"] = null;', `window["firebaseToken"] = ${firebaseToken};`)
    indexHTML.replace('window["isAdmin"] = false;', `window["isAdmin"] = ${true};`)

    res.contentType('text/html')
    res.status(200)

    return res.send(indexHTML)
})

app.listen('9000', () => {
    console.log('Сервер на порту 9000')
})