import EntityHelper from './abstract-helper'

class FavouritesHelper extends EntityHelper {

    static entityName = 'UserFavourites'

    static mapKey = [
        'id',
        'trackId'
    ]

    // static async loadFavouiritesTracks(userId: string) {

    //     const data = await this.query<iTrackError>(`
    //         SELECT * 
    //         FROM 
    //         WHERE trackId = '${trackId}'
    //     `)

    //     if(data.error) {
    //         throw data.error
    //     }

    //     return data.result
    // }
}

export default FavouritesHelper