import { Schema, Types, model, SchemaTypeOptions } from 'mongoose'

export const AdminSchema = new Schema({
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