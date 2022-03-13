import { async } from '@firebase/util'
import { firestore, auth } from 'firebase-admin'
import { isDev, databaseConnected } from './common'
import database from './database'
import { createGuid } from '../code/common/guid'

const createFirebaseToken = async (req, isValidVk: boolean): Promise<[string, boolean]> => {

    if (!databaseConnected) return [null, false]

    let vkId = createGuid()
    let admin = false

    if (isValidVk) {

        const query = req.query
        vkId = !isDev ? (query && query.vk_user_id) : '222834864'

        const store = firestore(database.app)
        admin = !(await store.collection('admins').where('vkId', '==', +vkId).get()).empty
    } 

    return [await database.app.auth().createCustomToken(vkId, { admin }), admin] 
}

export default createFirebaseToken