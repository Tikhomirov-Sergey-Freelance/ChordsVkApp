import { iArtist } from 'types/artists'
import EntityHelper from './abstract-helper'

class ArtistHelper extends EntityHelper {

    static entityName = 'Artists'

    static mapKey = [
        'id',
        'name',
        'description',
        'artistImage',
        'searchName'
    ]

    static async loadAllArtists(): Promise<iArtist[]> {

        const data = await this.query<iArtist>(`
            SELECT *
            FROM Artists
        `)

        if(data.error) {
            throw data.error
        }

        return data.result
    }

    static async loadArtistById(id: string) {
        
        const data = await this.query<iArtist>(`
            SELECT *
            FROM Artists
            WHERE id = '${id}'
        `)
        
        if(data.error) {
            throw data.error
        }

        return data.result
    }

    static async loadArtistByTag(tag: string) {

        tag = tag.toUpperCase().replace(/'/ig, '.')

        const data = await this.query<iArtist>(`
            SELECT art.*
            FROM artist art
            JOIN artisttag tag on art.id = tag.artistId
            WHERE tag = '${tag}'
        `)

        if(data.error) {
            throw data.error
        }

        return data.result
    }
}

export default ArtistHelper