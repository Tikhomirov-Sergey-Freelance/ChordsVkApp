import crypto from 'crypto'
import fs from 'fs'
import { isDev } from './common'
import { resolve } from 'path'

const config = JSON.parse(fs.readFileSync(resolve(__dirname, '..', 'private/vk-secret-key.json')).toString('utf8'))

const validateVkParams = (req) => {

    if(isDev) return true

    const query = req.query
    let vkParams = []

    const sign: string = query.sign

    if(!sign) return false

    for(let key in query) {

        if(key.startsWith('vk_')) {
            vkParams.push(`${key}=${query[key]}`)
        }
    }

    const vkParamsString = vkParams.join('&')

    const paramsHash = crypto
    .createHmac('sha256', config.secret)
    .update(vkParamsString)
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=$/, '')

    return paramsHash === sign
}

export default validateVkParams