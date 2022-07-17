import { createGuid } from 'code/common/guid'
import { iArtist, iAddArtistDTO } from 'types/artists'

import EntityHelper from './abstract-helper'

import ArtistTagHelper from './atrist-tags'

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

        if (data.error) {
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

        if (data.error) {
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

        if (data.error) {
            throw data.error
        }

        return data.result
    }

    static async insertArtist(artistDto: iAddArtistDTO) {


        const artist: iArtist = {
            id: createGuid(),
            name: artistDto.name,
            description: artistDto.description,
            artistImage: artistDto.artistImage,
            searchName: artistDto.name.toLowerCase()
        }

        const artistTags = ArtistTagHelper.getEntitiesByTags(artist, artistDto.tags)

        await this.transaction<boolean>(async (connection) => {

            await this.transactionInsertOne(connection, artist)
            await ArtistTagHelper.insertMany(artistTags)

            return { result: true }
        })

        return artist
    }
}

export default ArtistHelper