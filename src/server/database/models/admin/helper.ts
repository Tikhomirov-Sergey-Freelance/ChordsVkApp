import model from '.'

export default class AdminHelper {

    static findByVkId(id: number) {
        return model.findOne({ vkId: { $eq: id } })
    }
}