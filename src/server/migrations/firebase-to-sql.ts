import { firestore } from 'firebase-admin'
import { resolve } from 'path'
import { Database } from '../database'

import adminHelper from '../database/helpers/admin'
import chordsHelper from '../database/helpers/chords'
import artistHelper from '../database/helpers/artist'
import trackCandidateHelper from '../database/helpers/track-candidates'
import artistTagsHelper from '../database/helpers/atrist-tags'
import trackHelper from '../database/helpers/track'
import trackMetricsHelper from '../database/helpers/track-metrics'
import trackErrorsHelper from '../database/helpers/track-errors'
import userFavouritesHelper from '../database/helpers/favourites'
import { Result } from 'server/database/connect'

type Insert = (data: unknown) => Promise<Result<unknown>>
type DictionaryItem = { insert: Insert }
type Dictionary = { [key: string]: DictionaryItem }

const dictionary: Dictionary = {
    chords: { insert: (data) => chordsHelper.insertOne(data) },
    admins: {
        insert: (data) => {
            data['vkId'] = data['vkId'].toString()
            return adminHelper.insertOne(data)
        }
    },
    'track-candidates': { insert: (data) => trackCandidateHelper.insertOne(data) },
    artists:  { insert: (data) => artistHelper.insertOne(data) },
    'artist-tags': { insert: (data) => artistTagsHelper.insertOne(data) },
     'tracks': { insert: (data) => trackHelper.insertOne(data) },
    'track-metrics': { insert: (data) => trackMetricsHelper.insertOne(data) },
    'track-errors': { insert: (data) => trackErrorsHelper.insertOne(data) },
    'favourites': { insert: (data) => userFavouritesHelper.insertOne(data) },
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

        let count = 0
        let duplicates = 0

        const inserts = data.map(async data => {
            try {
                const values = data.data as object
                const { insert } = model

                const result = await insert({ ...values })

                if (result.error) {
                    throw result.error
                }

                count++
                
            } catch (error) {

                if(error?.code === 'ER_DUP_ENTRY') {
                    duplicates++
                } else {
                    console.log(`Коллекция ${collection}. Ошибка ${error}`)
                }
            }
        })

        await Promise.all(inserts)

        console.log(`Коллекция ${collection}. 
            Завершение загрузки. Обработано: ${count}, Дублей: ${duplicates}, Всего: ${data.length}`)

    } catch (error) {
        console.log(`Коллекция ${collection}. Ошибка загрузки ${error}`)
    }
}

firebaseToJson()