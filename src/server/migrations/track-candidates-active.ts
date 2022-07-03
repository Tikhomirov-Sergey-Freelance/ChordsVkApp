import { firestore } from 'firebase-admin'
import { resolve } from 'path'
import { Database } from '../database'

const load = async () => {

    const database = new Database()
    database.devPath = resolve(__dirname, '../../..', 'ChordsPrivate/firebase/service-account-key.json')
    database.init()
    
    const store = firestore(database.app)

    const docs = await store.collection('track-candidates').get()
    
    const updates = docs.docs.map(doc => store.doc(`track-candidates/${doc.id}`).update({ state: 'active' }))
    
    await Promise.all(updates)
}

load()