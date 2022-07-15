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
            LIMIT 5 OFFSET 3
        `)

        if(data.error) {
            throw data.error
        }
        
        return data.result
    } 

    static async loadChordsByNote(note: string): Promise<iChord[]> {

        const data = await this.query<iChord>(`
            SELECT * 
            FROM Chords
            WHERE note = '${note}'
        `)

        if(data.error) {
            throw data.error
        }
        
        return data.result
    }

    static async loadChordsByQuery(query: string): Promise<iChord[]> {

        const searchName = query.toUpperCase()

        const data = await this.query<iChord>(`
            SELECT *
            FROM Chords
            WHERE searchName LIKE '${searchName}%'
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