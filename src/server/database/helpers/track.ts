import EntityHelper from './abstract-helper'
import { iTrack, iTrackDataBase } from 'types/track'
import { RequestData } from '../connect'

class TrackHelper extends EntityHelper {

    static entityName = 'Tracks'

    static mapKey = [
        'id',
        'num',
        'name',
        'artistId',
        'riff',
        'riffNote',
        'strumming',
        'strummingNote',
        'intro',
        'introNote',
        'outro',
        'outroNote',
        'chordsText',
        'trackVideoSrc',
        'userId',
        'addedDate',
        'searchNameStartArtist',
        'searchNameEndArtist'
    ]

    protected static requiredKeys = [
        'id',
        'name',
        'artistId'
    ]

    protected static insertMapper(data: iTrack): iTrackDataBase {
        return {
            ...data,
            num: data.index,
            strumming: data.strumming && JSON.stringify(data.strumming),
            intro: data.intro && JSON.stringify(data.intro),
            outro: data.outro && JSON.stringify(data.outro),
            chordsText: data.chordsText && JSON.stringify(data.chordsText), 
            addedDate: null
        }
    }

    static async loadAllTracks(requestData: RequestData = {}) {
        
        const data = await this.query<iTrack>(`
            SELECT *
            FROM Tracks
        `, requestData)

        if(data.error) {
            throw data.error
        }
        
        return data.result
    }

    static async loadTrackByQuery(query: string, requestData: RequestData = {}) {

        query = query.toUpperCase().replace(/'/ig, '.')

        const data = await this.query<iTrack>(`
            SELECT *
            FROM Tracks
            WHERE searchNameStartArtist LIKE '${query}%' OR searchNameEndArtist LIKE '${query}%'
        `, requestData)

        if(data.error) {
            throw data.error
        }
        
        return data.result
    }

    static async loadTrackById(id: string, requestData: RequestData = {}) {

        const data = await this.query<iTrack>(`
            SELECT *
            FROM Tracks
            WHERE id = '${id}'
        `, requestData)
 
        if(data.error) {
            throw data.error
        }
        
        return data.result
    }

    static async loadTracksByArtistId(artistId: string, requestData: RequestData = {}) {

        const data = await this.query<iTrack>(`
            SELECT *
            FROM Tracks
            WHERE artistId = '${artistId}'
        `, requestData)

        if(data.error) {
            throw data.error
        }
        
        return data.result
    }

    static getIntroByDatabase(candidate: iTrackDataBase) {
        return candidate.intro && JSON.parse(candidate.intro)
    }

    static getOutroByDatabase(candidate: iTrackDataBase) {
        return candidate.outro && JSON.parse(candidate.outro)
    }

    static getStrummingByDatabase(candidate: iTrackDataBase) {
        return candidate.strumming && JSON.parse(candidate.strumming)
    }

    static getChordTextByDatabase(candidate: iTrackDataBase) {
        return candidate.chordsText && JSON.parse(candidate.chordsText)
    }

    static getTrackIndex(candidate: iTrackDataBase) {
        return candidate.num
    }
}

export default TrackHelper