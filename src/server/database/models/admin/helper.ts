import { iAdmin } from 'types/admin'
import Shema, { AdminSchema } from '.'

export default class AdminHelper {

    static findByVkId(id: number) {
        return Shema.findOne<iAdmin>({ vkId: { $eq: id } })
    }
}