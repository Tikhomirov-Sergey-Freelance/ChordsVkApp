import { Schema, Types, model, SchemaTypeOptions } from 'mongoose'
import { iUserFavorite } from 'types/common'

export const UserFavoriteSchema = new Schema<iUserFavorite>({
    id: {
        type: String,
        unique: true,
        required: true
    },
    tracks: {
        type: [String],
        required: true
    }

}, { versionKey: false })

export default model('favourites', UserFavoriteSchema)