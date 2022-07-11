import EntityHelper from './abstract-helper'
import { iTrack } from 'types/track'

class TrackHelper extends EntityHelper {

    static entityName = 'Track'

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
        'userId'
    ]

    protected static requiredKeys = [
        'id',
        'name',
        'artistId'
    ]

    protected static insertMapper(data: iTrack) {
        return {
            ...data,
            strumming: data.strumming && JSON.stringify(data.strumming),
            intro: data.intro && JSON.stringify(data.intro),
            outro: data.outro && JSON.stringify(data.outro),
            chordsText: data.chordsText && JSON.stringify(data.chordsText)
        }
    }
}

export default TrackHelper