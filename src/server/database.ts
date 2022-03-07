import admin, { auth } from 'firebase-admin'
import fs from 'fs'
import { resolve } from 'path'

class Database {

    app: admin.app.App

    init() {

        try {

            const configPath = this.getConfigPath()

            if (!configPath) {
                throw new Error('Не найдет файл конфигурации.')
            }

            const config = JSON.parse(fs.readFileSync(configPath).toString('utf8'))
            this.app = admin.initializeApp({
                credential: admin.credential.cert(config),
                databaseURL: "https://chords-7f150.firebaseio.com"
            })
            
            this.app.auth()

            process["database_connected"] = true

        } catch (error) {
            console.warn(`Не удалось установить соединение с firebase. ${error}`)
        }
    }

    getConfigPath(): string {

        let prodPath = resolve(__dirname, '..', 'ChordsPrivate/firebase/service-account-key.json')
        let devPath = resolve(__dirname, '..', 'private/service-account-key.json')

        let path

        if (fs.existsSync(devPath)) {
            return devPath
        }

        if (fs.existsSync(prodPath)) {
            return prodPath
        }

        return null
    }
}

const database = new Database()
export default database