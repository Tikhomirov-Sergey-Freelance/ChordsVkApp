import { firestore } from 'firebase-admin'
import { resolve } from 'path'
import { iShortTrack } from 'types/track'
import { Database } from '../database'

const load = async () => {

    const database = new Database()
    database.devPath = resolve(__dirname, '../../..', 'ChordsPrivate/firebase/service-account-key.json')
    database.init()
    
    const store = firestore(database.app)

    const docs = await store.collection('short-tracks').get()
    
    const updates = docs.docs.map(doc => {

        const track: iShortTrack = doc.data() as iShortTrack

        if(track.name.startsWith(' ')) {
            store.doc(`short-tracks/${doc.id}`).update({ name: track.name.trim() })
            store.doc(`tracks/${doc.id}`).update({ name: track.name.trim() })
        }
    })
    
    await Promise.all(updates)

}

load()