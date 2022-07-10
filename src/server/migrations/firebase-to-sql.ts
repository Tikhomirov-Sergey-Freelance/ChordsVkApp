import { firestore } from 'firebase-admin'
import { resolve } from 'path'
import { Database } from '../database'
import connect from '../database/mongo-connect'

import adminHelper from '../database/helpers/admin'
import { Result } from 'server/database/connect'
/* import chordsModel from '../database/models/chord'
import trackCandidateModel from '../database/models/track-candidates'
import { artistModel, artistTagModel } from '../database/models/artist'
import { trackModel } from '../database/models/track'
import { trackMetrics } from '../database/models/track-metrics'
import { trackErrorModel } from '../database/models/track-errors'
import favoriteModel from '../database/models/user-favorite' */

type Insert = (data: unknown) => Promise<Result<unknown>>
type DictionaryItem = { insert: Insert }
type Dictionary = { [key: string]: DictionaryItem }

const dictionary: Dictionary = {
    // cords: { insert: (data) => adminHelper.insertOne(data) },
    admins: {
        insert: (data) => {
            data['vkId'] = data['vkId'].toString()
            return adminHelper.insertOne(data)
        }
    }
        /* admins: { model: adminModel },
        'track-candidates': { model: trackCandidateModel },
        artists: { model: artistModel },
        'artist-tags': { model: artistTagModel },
        'tracks': {
            model: trackModel, parseData: (data) => {
                data.data.addedDate = new Date()
                data.data.index = trackIndex++
            }
        },
        'track-metrics': { model: trackMetrics },
        'track-errors': { model: trackErrorModel },
        'favourites': { model: favoriteModel } */
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

    const requests = keys.map(key => collectionToSQL(key, store, dictionary[key]))

    await Promise.all(requests)
    console.log('Завершение экспорта')
}

const collectionToSQL = async (collection: string, firestore: firestore.Firestore, model: DictionaryItem) => {

    try {

        console.log(`Коллекция ${collection}. Начало загрузки`)

        const collectionResult = (await firestore.collection(collection)).get()

        const data: iExportData[] = (await collectionResult).
            docs.map(document => ({ id: document.id, data: document.data() }))

        await connect(async () => {

            const inserts = data.map(async data => {
                try {
                    const values = data.data as object
                    const { insert } = model

                    const result = await insert({ ...values })

                    if (result.error) {
                        throw result.error
                    }

                } catch (error) {
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