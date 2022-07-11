import EntityHelper from './abstract-helper'
import { iChord } from 'types/chord'

class ChordsHelper extends EntityHelper {

    static entityName = 'Chords'

    static mapKey = [
        'instrument',
        'note',
        'name',
        'startFret',
        'barre',
        'guitarStrings',
        'searchName'
    ]

    protected static insertMapper(data: iChord) {
        return {
            ...data,
            guitarStrings: JSON.stringify(data.guitarStrings)
        }
    }
}

export default ChordsHelper