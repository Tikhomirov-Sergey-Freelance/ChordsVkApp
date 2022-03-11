import { async } from '@firebase/util'
import { firestore, auth } from 'firebase-admin'
import { isDev, databaseConnected } from './common'
import database from './database'
import { createGuid } from '../code/common/guid'

const createFirebaseToken = async (req, isValidVk: boolean) => {

    if (!databaseConnected) return

    if (isValidVk) {

        const query = req.query
        const vkId = !isDev ? (query && query.vk_user_id) : '222834864'
        if (!vkId) return

        const store = firestore(database.app)
        const admin = !(await store.collection('admins').where('vkId', '==', +vkId).get()).empty

        return await database.app.auth().createCustomToken(vkId, { admin })

    } else {

        return await database.app.auth().createCustomToken(createGuid())
    }
}

export default createFirebaseToken