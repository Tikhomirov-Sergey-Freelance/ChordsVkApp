import EntityHelper from './abstract-helper'
import { iTrackCandidate } from 'types/track-candidate'

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
        'userId'
    ]

    protected static requiredKeys = [
        'id',
        'name'
    ]

    protected static insertMapper(data: iTrackCandidate) {
        return {
            ...data,
            strumming: data.strumming && JSON.stringify(data.strumming),
            intro: data.intro && JSON.stringify(data.intro),
            outro: data.outro && JSON.stringify(data.outro),
            chordsText: data.chordText && JSON.stringify(data.chordText),
        }
    }
}

export default TrackCandidatesHelper