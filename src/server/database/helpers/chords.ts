import EntityHelper from './abstract-helper'
import { iChord, iChordDataBase } from 'types/chord'

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

    static insertMapper(data: iChord) {
        return {
            ...data,
            guitarStrings: JSON.stringify(data.guitarStrings)
        }
    }

    static async loadAllChords(): Promise<iChord[]> {

        const data = await this.query<iChord>(`
            SELECT *
            FROM Chords
        `)

        if(data.error) {
            throw data.error
        }
        
        return data.result
    }

    static getChordStrings(chord: iChordDataBase) {
        return JSON.parse(chord.guitarStrings)
    }
}

export default ChordsHelper