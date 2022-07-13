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
        `)
        
        if(data.result?.length) {
            return true
        }

        return false
    }
}

export default AdminHelper