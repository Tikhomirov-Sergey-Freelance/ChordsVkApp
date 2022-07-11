import EntityHelper from './abstract-helper'

class TrackErrorHelper extends EntityHelper {

    static entityName = 'TrackError'

    static mapKey = [
        'id',
        'userId',
        'trackId',
        'message'
    ]
}

export default TrackErrorHelper