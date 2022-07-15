import EntityHelper from './abstract-helper'
import { iTrackCandidate, TrackCandidateState, iTrackCandidateDataBase } from 'types/track-candidate'
import { RequestData } from '../connect'

class TrackCandidatesHelper extends EntityHelper {

    static entityName = 'TrackCandidate'

    static mapKey = [
        'id',
        'name',
        'artist',
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
        'state',
        'trackId'
    ]

    protected static requiredKeys = [
        'id',
        'name'
    ]

    static async loadCandidatesByState(state: TrackCandidateState = 'active', requestData: RequestData) {

        const data = await this.query<iTrackCandidate>(`
            SELECT *
            FROM TrackCandidate
            WHERE state = '${state}'
        `, requestData) 

        if(data.error) {
            throw data.error
        }
        
        return data.result
    }

    protected static insertMapper(data: iTrackCandidate): iTrackCandidateDataBase {
        return {
            ...data,
            strumming: data.strumming && JSON.stringify(data.strumming),
            intro: data.intro && JSON.stringify(data.intro),
            outro: data.outro && JSON.stringify(data.outro),
            chordsText: data.chordText && JSON.stringify(data.chordText),
        }
    }

    static getIntroByDatabase(candidate: iTrackCandidateDataBase) {
        return candidate.intro && JSON.parse(candidate.intro)
    }

    static getOutroByDatabase(candidate: iTrackCandidateDataBase) {
        return candidate.outro && JSON.parse(candidate.outro)
    }

    static getStrummingByDatabase(candidate: iTrackCandidateDataBase) {
        return candidate.strumming && JSON.parse(candidate.strumming)
    }

    static getChordTextByDatabase(candidate: iTrackCandidateDataBase) {
        return candidate.chordsText && JSON.parse(candidate.chordsText)
    }
}

export default TrackCandidatesHelper