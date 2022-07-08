import connect from 'server/database/mongo-connect'
import { iAdmin } from 'types/admin'
import model from '.'

export default class AdminHelper {

    static create(admin: iAdmin) {

        return connect(() => {
            return model.create(admin)
        })
    }

    static findByVkId(id: number) {
        return model.findOne({ vkId: { $eq: id } })
    }
}