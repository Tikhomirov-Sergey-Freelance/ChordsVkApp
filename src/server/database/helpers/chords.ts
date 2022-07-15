import EntityHelper from './abstract-helper'
import { iChord, iChordDataBase } from 'types/chord'
import { RequestData } from '../connect'

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

    static async loadAllChords(requestData: RequestData = {}): Promise<iChord[]> {

        const data = await this.query<iChord>(`
            SELECT *
            FROM Chords
        `, requestData) 

        if(data.error) {
            throw data.error
        }
        
        return data.result
    } 

    static async loadChordsByNote(note: string, requestData: RequestData = {}): Promise<iChord[]> {

        const data = await this.query<iChord>(`
            SELECT * 
            FROM Chords
            WHERE note = '${note}'
        `, requestData)

        if(data.error) {
            throw data.error
        }
        
        return data.result
    }

    static async loadChordsByQuery(query: string, requestData: RequestData = {}): Promise<iChord[]> {

        const searchName = query.toUpperCase()

        const data = await this.query<iChord>(`
            SELECT *
            FROM Chords
            WHERE searchName LIKE '${searchName}%'
        `, requestData)

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