import { Schema, model } from 'mongoose'
import { iAdmin } from 'types/admin'

export const AdminSchema = new Schema<iAdmin>({
    vkId: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: false,
        required: true
    }

}, { versionKey: false })

export default model('admins', AdminSchema)