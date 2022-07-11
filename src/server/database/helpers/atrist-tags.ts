import EntityHelper from './abstract-helper'

class ArtistTagsHelper extends EntityHelper {

    static entityName = 'ArtistTag'

    static mapKey = [
        'id',
        'artistId',
        'tag',
        'strict'
    ]

    protected static requiredKeys = [
        'id',
        'artistId'
    ]
}

export default ArtistTagsHelper