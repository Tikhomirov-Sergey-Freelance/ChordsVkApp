import crypto from 'crypto'
import fs from 'fs'
import { isDev } from './common'
import { resolve } from 'path'

const devVKSecret = {
    'secret': '1111111'
}

const validateVkParams = (req) => {

    if(isDev) return true

    const query = req.query
    const vkParams = []

    const sign: string = query.sign

    if(!sign) return false 

    for(const key in query) {

        if(key.startsWith('vk_')) {
            vkParams.push(`${key}=${query[key]}`)
        }
    }

    const vkParamsString = vkParams.join('&')
    
    const config = getVKConfig()

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

export const getVKConfig = () => {
    
    const configPath = resolve(__dirname, '..', 'ChordsPrivate/firebase/vk-secret-key.json')

    if(isDev || !fs.existsSync(configPath)) {
        return devVKSecret
    }

    const file = fs.readFileSync(resolve(__dirname, '..', 'ChordsPrivate/firebase/vk-secret-key.json')).toString('utf8')
    return JSON.parse(file)
}

export default validateVkParams