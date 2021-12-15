import admin, { auth } from 'firebase-admin'
import fs from 'fs'
import { resolve } from 'path'

class Database {

    app: admin.app.App

    init() {
        const config = JSON.parse(fs.readFileSync(resolve(__dirname, '..', 'private/service-account-key.json')).toString('utf8'))
        this.app = admin.initializeApp(config)
        //this.app.auth()
    }
}

const database = new Database()
export default database