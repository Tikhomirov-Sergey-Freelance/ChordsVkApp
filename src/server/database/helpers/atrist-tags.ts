import { iArtistTag } from 'types/artists'
import EntityHelper from './abstract-helper'

class ArtistTagsHelper extends EntityHelper {

    static entityName = 'ArtistTag'

    static mapKey = [
        'id',
        'artistId',
        'tag',
        'strict'
    ]

    protected static requiredKeys = [
        'id',
        'artistId'
    ]

    static async loadAllTags() {

        const data = await this.query<iArtistTag>(`
            SELECT * 
            FROM ArtistTag
        `)

        if(data.error) {
            throw data.error
        }

        return data.result
    }

    static async loadTagsByArtist(artistId: string) {

        const data = await this.query<iArtistTag>(`
            SELECT * 
            FROM ArtistTag
            WHERE artistId = '${artistId}'
        `)

        if(data.error) {
            throw data.error
        }

        return data.result
    }
}

export default ArtistTagsHelper