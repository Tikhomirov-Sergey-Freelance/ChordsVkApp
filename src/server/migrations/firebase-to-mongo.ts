import admin, { auth, firestore } from 'firebase-admin'
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { Database } from '../database'
import connect from '../database/connect'

import adminModel from '../database/models/admin'
import chordsModel from '../database/models/chord'
import trackCandidateModel from '../database/models/track-candidates'
import { artistModel, shortArtistModel, artistTagModel } from '../database/models/artist'

const collections = ['chords', 'admins', 'track-candidates', 'artists', 'short-artists', 'tracks', 'short-tracks', 'track-metrics', 'track-errors', 'favourites', 'artist-tags']
const dictionary = {
    chords: chordsModel,
    admins: adminModel,
    'track-candidates': trackCandidateModel,
    artists: artistModel,
    'short-artists': shortArtistModel,
    'artist-tags': artistTagModel
}


interface iExportData {
    id: string, data: any
}

const firebaseToJson = async () => {

    console.log('Начало экспорта')

    const database = new Database()
    database.devPath = resolve(__dirname, '../../..', 'ChordsPrivate/firebase/service-account-key.json')
    database.init()
     
    const store = firestore(database.app)
    const keys = Object.keys(dictionary)

    const requests = keys.map(key => collectionToMongo(key, store, dictionary[key]))

    await Promise.all(requests)
    console.log('Завершение экспорта')
}

const collectionToMongo = async (collection: string, firestore: firestore.Firestore, model: any) => {

    try {

        console.log(`Коллекция ${collection}. Начало загрузки`)

        const collectionResult = (await firestore.collection(collection)).get()
        const data: iExportData[] = (await collectionResult).docs.map(document => ({ id: document.id, data: document.data() }))

        await connect(async () => {

            const inserts = data.map(async data => {
                try {
                    await model.create({ ...data.data })
                } catch(error) {
                    console.log(`Коллекция ${collection}. Ошибка ${error}`)
                }
            })
            await Promise.all(inserts)
        })

        console.log(`Коллекция ${collection}. Завершение загрузки`)

    } catch (error) {
        console.log(`Коллекция ${collection}. Ошибка загрузки ${error}`)
    }
}

firebaseToJson()