import { firestore } from 'firebase-admin'
import { existsSync, rmSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { Database } from '../database'
import connect from '../database/mongo-connect'

import adminModel from '../database/models/admin'
import chordsModel from '../database/models/chord'
import trackCandidateModel from '../database/models/track-candidates'
import { artistModel, artistTagModel } from '../database/models/artist'
import { trackModel } from '../database/models/track'
import { trackMetrics } from '../database/models/track-metrics'
import { trackErrorModel } from '../database/models/track-errors'
import favoriteModel from '../database/models/user-favorite'

let trackIndex = 1

const dictionary = {
    chords: { model: chordsModel },
    admins: { model: adminModel },
    'track-candidates': { model: trackCandidateModel },
    artists: { model: artistModel },
    'artist-tags': { model: artistTagModel },
    'tracks': { model: trackModel, parseData: (data) => {
        data.data.addedDate = new Date()
        data.data.index = trackIndex++
    } },
    'track-metrics': { model: trackMetrics },
    'track-errors': { model: trackErrorModel },
    'favourites': { model: favoriteModel }
}

interface iExportData {
    id: string, data: unknown
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

        const data: iExportData[] = (await collectionResult).
        docs.map(document => ({ id: document.id, data: document.data() }))

        await connect(async () => {

            const inserts = data.map(async data => {
                try {

                    if(model.parseData) {
                        model.parseData(data)
                    }

                    await model.model.create({ ...data.data })

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