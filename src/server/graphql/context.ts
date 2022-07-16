import { Request } from 'express'

import validateVK from '../vk'
import fireBaseToken from '../auth'

export type Context = {
    userId: string
    isAdmin: boolean
    isValidVk: boolean
}

export type GetContext = () => Promise<Context>

export const getContext = async (request: Request) => {

    const isValidVk = validateVK(request)
    const [,userId, isAdmin] = await fireBaseToken(request, isValidVk)
    
    const context: Context = {
        userId,
        isAdmin,
        isValidVk
    }

    return context
}

