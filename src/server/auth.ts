import { firestore } from 'firebase-admin'
import { isDev, databaseConnected } from './common'
import database from './database'
import { createGuid } from '../code/common/guid'

const createFirebaseToken = async (req, isValidVk: boolean): Promise<[string, string, boolean]> => {

    if (!databaseConnected) return [null, null, false]

    let vkId = createGuid()
    let admin = false

    if (isValidVk) {

        const query = req.query
        vkId = !isDev ? (query && query.vk_user_id) : '222834864'

        const store = firestore(database.app)
        admin = !(await store.collection('admins').where('vkId', '==', +vkId).get()).empty
    } 

    return [await database.app.auth().createCustomToken(vkId, { admin, vkuser: isValidVk, id: vkId }), vkId, admin] 
}

export default createFirebaseToken