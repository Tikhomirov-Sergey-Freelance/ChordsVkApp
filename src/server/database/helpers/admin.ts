import EntityHelper from './abstract-helper'

class AdminHelper extends EntityHelper {

    static entityName = 'Admins'

    static mapKey = [
        'vkId',
        'name'
    ]

    static async isAdmin(vkId: string) {

        if(!vkId) return false
        
        const data = await this.query(`
            SELECT 1 
            FROM Admins
            WHERE vkId = ${vkId}
        `, (data) => !!data?.length)
        
        if(data.result) {
            return true
        }

        return false
    }
}

export default AdminHelper