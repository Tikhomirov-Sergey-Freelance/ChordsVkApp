import EntityHelper from './abstract-helper'

class ChordsHelper extends EntityHelper {

    static entityName = 'Artist'

    static mapKey = [
        'id',
        'name',
        'description',
        'artistImage',
        'searchName'
    ]
}

export default ChordsHelper