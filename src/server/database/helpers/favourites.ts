import EntityHelper from './abstract-helper'

class FavouritesHelper extends EntityHelper {

    static entityName = 'UserFavourites'

    static mapKey = [
        'id',
        'trackId'
    ]
}

export default FavouritesHelper