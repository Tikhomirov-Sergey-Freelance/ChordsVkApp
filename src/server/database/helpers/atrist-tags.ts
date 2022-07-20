import { iArtistTag, iArtistTagDTO } from 'types/artists'
import { createGuid } from '../../../code/common/guid'
import { Connection, Result } from '../connect'
import EntityHelper from './abstract-helper'

class ArtistTagsHelper extends EntityHelper {

    static entityName = 'ArtistTag'

    static mapKey = [
        'tag',
        'id',
        'artistId',
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

        if (data.error) {
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

        if (data.error) {
            throw data.error
        }

        return data.result
    }

    static async transactionUpdateTags
        (connection: Connection,
            artistId: string,
            tags: iArtistTagDTO[] = [],
            artistName?: string): Promise<Result<boolean>> {

        const artistTags = this.getEntitiesByTags(artistId, tags, artistName)
        
        const { error: delError } = await this.transactionDeleteTags(connection, artistId)
        const { error: insertError } = await this.transactionInsertMany(connection, artistTags)
                
        if(delError || insertError) {
            throw delError || insertError
        }
        
        return { result: true }
    }

    static async transactionDeleteTags(connection: Connection, artistId: string) {
        return this.transactionExecute(connection, `
            DELETE FROM ArtistTag WHERE artistId = '${artistId}'
        `)
    }

    static getEntitiesByTags(artistId: string, tags: iArtistTagDTO[] = [], artistName?: string) {

        const entities: iArtistTag[] = tags.map(tag => ({
            ...tag as iArtistTag,
            id: createGuid(),
            artistId,
            strict: tag.strict || false
        }))

        const searchName = artistName?.toUpperCase()

        if (searchName && !entities.some(entity => entity.tag === searchName)) {
            entities.push({ id: createGuid(), tag: searchName, artistId })
        }

        return entities
    }
}

export default ArtistTagsHelper