import express from 'express'
import useragent from 'express-useragent'
import database from './server/database'
import validateVK from './server/vk'
import fireBaseToken from './server/auth'
import http from 'http'

import getApp from './ssr'
import initHttps from './server/ssl'
import { isHttp } from './code/env'

const app = express()
app.use(useragent.express())

database.init()

app.get(/\.(js|css|map|ico)$/, express.static(__dirname))

if(!isHttp) {
    app.use((req, res, next) => {
        if (req.secure) { 
            next()
        } else {
            res.redirect('https://' + req.hostname + req.url)
        }
    })
}

app.use('*', async (req, res) => {

    const isValidVk = validateVK(req)
    const [firebaseToken, vkId, isAdmin] = await fireBaseToken(req, isValidVk)

    const appParams = { isValidVk, vkId, firebaseToken, isAdmin }

    const html = getApp(req['useragent'].source, appParams)
    
    res.contentType('text/html')
    res.status(200)

    return res.send(html)
})

const httpServer = new http.Server(app)

httpServer.on('listening', () => {
    console.log('Http сервер развернут на 80 порту')
})

httpServer.listen(80)

if(!isHttp) {

    const httpsServer = initHttps(app)

    httpsServer.on('listening', () => {
        console.log('Https сервер развернут на 443 порту')
    })
    
    httpsServer.listen(443)
}