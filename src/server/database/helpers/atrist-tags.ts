import { iArtist, iArtistTag, iArtistTagDTO } from 'types/artists'
import { createGuid } from '../../../code/common/guid'
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

    static getEntitiesByTags(artist: iArtist, tags: iArtistTagDTO[] = []) {

        const entities: iArtistTag[] = tags.map(tag => ({
            ...tag as iArtistTag,
            id: createGuid(),
            artistId: artist.id
        }))

        if(entities.some(entity => entity.tag === artist.searchName)) {
            entities.push({ id: createGuid(), tag: artist.searchName, artistId: artist.id })
        }

        return entities
    }
}

export default ArtistTagsHelper