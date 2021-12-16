import { async } from '@firebase/util'
import { firestore, auth } from 'firebase-admin'
import { isDev } from './common'
import database from './database'

const createFirebaseToken = async (req) => {

    const query = req.query 
    const vkId = !isDev ? (query && query.vk_user_id) : '222834864'
    if(!vkId) return

    const store = firestore(database.app)
    const isAdmin = !(await store.collection('admins').where('vkId', '==', +vkId).get()).empty
    if(!isAdmin) return

    return await database.app.auth().createCustomToken(vkId)
}

export default createFirebaseToken