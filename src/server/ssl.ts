import https from 'https'
import path from 'path'
import fs from 'fs'

const initHttps = (app) => {

    app.use((req, res, next) => {
        if (req.secure) {
            next()
        } else {
            res.redirect('https://' + req.hostname + req.url)
        }
    })

    const dir = path.normalize(`${__dirname}/../ChordsPrivate/ssl`)

    const options: https.ServerOptions = {
        key: fs.readFileSync(`${dir}/private.key`),
        cert: fs.readFileSync(`${dir}/certificate.crt`),
        ca: fs.readFileSync(`${dir}/certificate_ca.crt`),
        requestCert: false,
        rejectUnauthorized: false
    }

    return https.createServer(options, app)

}

export default initHttps