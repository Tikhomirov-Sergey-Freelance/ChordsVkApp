import { ResultSetHeader } from 'mysql2'
import db, { Result } from '../connect'

abstract class EntityHelper {

    protected static entityName = ''
    protected static mapKey: string[] = []
    protected static requiredKeys: string[] = []
    protected static ignoreByInsert: string[] = []

    static query<R>(sql: string) {
        return db.query<R>(sql)
    }

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
        const mappedEntity = this.insertMapper(entity)

        for(const key of this.mapKey) {

            if(this.ignoreByInsert.includes(key)) continue
            
            if(!Object.prototype.hasOwnProperty.call(mappedEntity, key) &&
            this.requiredKeys.includes(key)) {
                throw new Error(`Неполная энтити. ${key}`)
            }

            if(mappedEntity[key] === undefined && this.requiredKeys.includes(key)) {
                throw new Error(`Свойство ${key} не определено`)
            }

            array.push(mappedEntity[key])
        }
       
        return array
    }

    protected static getKeysForSelect() {
        return this.mapKey
    }

    static mapper = <T>(data: unknown[][] = [], keys: string[]): T[] => {

        if(!data.length) return []

        if(data[0].length !== keys.length) {
            console.log(data[0], keys.length)
            throw 'Количество полей не совпадает с ожидаемыми'
        }

        const entities = data.map(item => {

            const entity = {}

            for(let i = 0; i < keys.length; i++) {
                entity[keys[i]] = item[i]
            }

            return entity
        })

        return entities as T[]
    }

    protected static insertMapper(data: unknown) {
        return { ...data as object }
    }
}

export default EntityHelper