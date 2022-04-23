import admin, { auth, firestore } from 'firebase-admin'
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { Database } from '../database'

const collections = ['chords', 'admins', 'track-candidates', 'artists', 'short-artists', 'tracks', 'short-tracks']
const dirPath = resolve(__dirname, '../../../..', 'data')

interface iExportData {
    id: string, data: any
}

const firebaseToJson = async () => {

    console.log('Начало экспорта')

    const database = new Database()
    database.devPath = resolve(__dirname, '../../..', 'ChordsPrivate/firebase/service-account-key.json')
    database.init()
    
    const store = firestore(database.app)

    if (!existsSync(dirPath)) {
        mkdirSync(dirPath)
        console.log(`Создана дирректория ${dirPath}`)
    }

    await Promise.all(collections.map(collection => collectionToJson(collection, store)))
    console.log('Завершение экспорта')
}

const collectionToJson = async (collection: string, firestore: firestore.Firestore) => {

    try {

        console.log(`Коллекция ${collection}. Начало загрузки`)

        const collectionPath = resolve(dirPath, `${collection}.json`)

        if (existsSync(resolve(dirPath, collectionPath))) {
            rmSync(collectionPath)
            console.log(`Коллекция ${collection}. Удалили старый json`)
        }

        const collectionResult = (await firestore.collection(collection)).get()
        const data: iExportData[] = (await collectionResult).docs.map(document => ({ id: document.id, data: document.data() }))

        writeFileSync(collectionPath, JSON.stringify(data))
        console.log(`Коллекция ${collection}. Завершение загрузки`)

    } catch (error) {
        console.log(`Коллекция ${collection}. Ошибка загрузки ${error}`)
    }
}

firebaseToJson()