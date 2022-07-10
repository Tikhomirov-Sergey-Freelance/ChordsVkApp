import EntityHelper from './abstract-helper'

class AdminHelper extends EntityHelper {

    static entityName = 'Admins'

    static mapKey = [
        'vkId',
        'name'
    ]
}

export default AdminHelper