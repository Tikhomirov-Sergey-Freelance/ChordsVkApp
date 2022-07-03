import admin from 'firebase-admin'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

export class Database {

    app: admin.app.App

    prodPath = resolve(__dirname, '..', 'ChordsPrivate/firebase/service-account-key.json')
    devPath = resolve(__dirname, '..', 'private/service-account-key.json')

    init() {

        try {

            const configPath = this.getConfigPath()

            if (!configPath) {
                throw new Error('Не найдет файл конфигурации.')
            }

            const config = JSON.parse(readFileSync(configPath).toString('utf8'))
            this.app = admin.initializeApp({
                credential: admin.credential.cert(config),
                databaseURL: 'https://chords-7f150.firebaseio.com'
            })
            
            this.app.auth()

            process['database_connected'] = true

        } catch (error) {
            console.warn(`Не удалось установить соединение с firebase. ${error}`)
        }
    }

    getConfigPath(): string {

        if (existsSync(this.devPath)) {
            return this.devPath
        }

        if (existsSync(this.prodPath)) {
            return this.prodPath
        }

        return null
    }
}

const database = new Database()
export default database