import { async } from '@firebase/util'
import { firestore } from 'firebase-admin'
import database from './database'

const createFirebaseToken = async (req) => {

    const query = req.query
    const store = firestore(database.app)

    //const y = await store.listCollections()

    //console.log(y)

}

export default createFirebaseToken