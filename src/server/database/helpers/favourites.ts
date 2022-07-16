import { RequestData } from '../connect'
import EntityHelper from './abstract-helper'

class FavouritesHelper extends EntityHelper {

    static entityName = 'UserFavourites'

    static mapKey = [
        'id',
        'trackId'
    ]

    static async loadFavouiritesTracks(userId: string, requestData: RequestData = {}) {

        const data = await this.query<unknown>(`
            SELECT track.* 
            FROM UserFavourites favourite
            JOIN Tracks track on track.id = favourite.trackId
            WHERE favourite.id = '${userId}'
        `, requestData)  
        
        if(data.error) {
            throw data.error
        }

        return data.result
    }
}

export default FavouritesHelper