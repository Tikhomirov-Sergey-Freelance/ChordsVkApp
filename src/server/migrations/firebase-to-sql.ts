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
type Parser = (data: unknown[]) => unknown[]
type DictionaryItem = { insert: Insert, parser?: Parser }
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
    'favourites': { insert: (data) => userFavouritesHelper.insertOne(data), parser: (data: unknown[]) => {

        const values = []

        data.forEach((valueRoot: unknown) => {

            const item = valueRoot['data']

            const id = item['id']
            const tracks: string[] = item['tracks']

            tracks.forEach(trackId => {
                values.push({ id, trackId })
            })
        })

        return values
    }},
}

interface iExportData {
    id: string, data: unknown
}

const firebaseToJson = async (keys: string[]) => {

    const database = new Database()
    database.devPath = resolve(__dirname, '../../..', 'ChordsPrivate/firebase/service-account-key.json')
    database.init()

    const store = firestore(database.app)

    const requests = keys.map(key => collectionToSQL(key, store, dictionary[key]))

    await Promise.all(requests)
}

const collectionToSQL = async (collection: string, firestore: firestore.Firestore, model: DictionaryItem) => {

    try {

        console.log(`Коллекция ${collection}. Начало загрузки`)

        const collectionResult = (await firestore.collection(collection)).get()

        const data: iExportData[] = (await collectionResult).
            docs.map(document => ({ id: document.id, data: document.data() }))

        let count = 0
        let duplicates = 0

        const { parser } = model

        const values = parser ? parser(data) : data.map(value => value.data as object)

        const inserts = values.map(async data => {
            try {

                const { insert } = model
                const result = await insert({ ...data as object })

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
            Завершение загрузки. Обработано: ${count}, Дублей: ${duplicates}, Всего: ${values.length}`)

    } catch (error) {
        console.log(`Коллекция ${collection}. Ошибка загрузки ${error}`)
    }
}

(async () => { 

    console.log('Начало экспорта')

    await firebaseToJson(['admins', 'track-candidates', 'artists', 'tracks'])
    await firebaseToJson(['artist-tags', 'track-metrics', 'track-errors', 'favourites'])

    console.log('Завершение экспорта')
})