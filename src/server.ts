import express from 'express'
import useragent from 'express-useragent'
import database from './server/database'
import validateVK from './server/vk'
import fireBaseToken from './server/auth'

import getApp from './ssr'

const app = express()
app.use(useragent.express())

database.init()

app.get(/\.(js|css|map|ico)$/, express.static(__dirname))
app.use('*', async (req, res) => {

    const html = getApp(req['useragent'].source)

    const isValidVk = validateVK(req)

    const adminToken = isValidVk ? await fireBaseToken(req) : null
    
    res.contentType('text/html')
    res.status(200)

    return res.send(html)
})

app.listen('9000', () => {
    console.log('Сервер на порту 9000')
})