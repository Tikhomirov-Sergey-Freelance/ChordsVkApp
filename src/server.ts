import express from 'express'
import useragent from 'express-useragent'
import database from './server/database'
import validateVK from './server/vk'
import fireBaseToken from './server/auth'

global['window'] = {}

import getApp from './ssr'

const app = express()
app.use(useragent.express())

database.init()

app.get(/\.(js|css|map|ico)$/, express.static(__dirname))
app.use('*', async (req, res) => {

    global['window'] = {}

    const isValidVk = validateVK(req)
    const adminToken = isValidVk ? await fireBaseToken(req) : null

    const html = getApp(req['useragent'].source, isValidVk, adminToken)
    
    res.contentType('text/html')
    res.status(200)

    return res.send(html)
})

app.listen('9000', () => {
    console.log('Сервер на порту 9000')
})