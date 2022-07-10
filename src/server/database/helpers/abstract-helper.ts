import { ResultSetHeader } from 'mysql2'
import db, { Result } from '../connect'

abstract class EntityHelper {

    static entityName = ''
    static mapKey: string[] = []

    static async insertOne(entity: unknown): Promise<Result<ResultSetHeader>> {

        try {

            const valuesMapPlace = Array(this.mapKey.length).fill('?').join(',') 
            
            const result = await db.insertOne(`
            INSERT INTO ${this.entityName}(${this.mapKey.join(',')})
            VALUES (${valuesMapPlace})`, this.entityToArray(entity))

            if(result.error) {
                throw result.error
            }

            return { result: result.result }

        } catch (error) {
            return { error }
        }
    }

    static async insertMany(entities: unknown[]): Promise<Result<boolean>> {

        try {

            const data = entities.map(entity => this.entityToArray(entity))

            const result = await db.insertMany(`
            INSERT INTO ${this.entityName}(${this.mapKey.join(',')})
            VALUES ?`, data)

            if(result.error) {
                throw result.error
            }

            return { result: result.result }

        } catch (error) {
            return { error }
        }
    }

    static entityToArray(entity: unknown) {

        const array = []

        for(const key of this.mapKey) {
            
            if(!Object.prototype.hasOwnProperty.call(entity, key)) {
                throw new Error('Неполная энтити')
            }

            if(entity[key] === undefined) {
                throw new Error(`Свойство ${key} не определено`)
            }

            array.push(entity[key])
        }

        return array
    }
}

export default EntityHelper