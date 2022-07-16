import { iTrackError } from 'types/track-error'
import EntityHelper from './abstract-helper'

class TrackErrorHelper extends EntityHelper {

    static entityName = 'TrackError'

    static mapKey = [
        'id',
        'userId',
        'trackId',
        'message'
    ]

    static async loadAllTrackErrors() {

        const data = await this.query<iTrackError>(`
            SELECT * 
            FROM TrackError
        `)

        if(data.error) {
            throw data.error
        }

        return data.result
    }

    static async loadTrackErrorsByTrackId(trackId: string) {

        const data = await this.query<iTrackError>(`
            SELECT * 
            FROM TrackError
            WHERE trackId = '${trackId}'
        `)

        if(data.error) {
            throw data.error
        }

        return data.result
    }
}

export default TrackErrorHelper