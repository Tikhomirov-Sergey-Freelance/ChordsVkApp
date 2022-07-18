import { ResultSetHeader } from 'mysql2'
import db, { Connection, RequestData, Result, TransactionAction } from '../connect'

abstract class EntityHelper {

    protected static entityName = ''
    protected static mapKey: string[] = []
    protected static requiredKeys: string[] = []
    protected static ignoreByInsert: string[] = []

    static query<R>(sql: string, requestData: RequestData = {}) {
        return db.query<R>(sql, requestData)
    }

    static async execute(sql: string, data?: unknown) {
        return db.execute(sql, data)
    }

    static async update(table: string, updateData: object, where: string) {
        return db.update(table, updateData, where)
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
            INSERT INTO ${this.entityName}(${this.mapKey.join(', ')})
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

            if(mappedEntity[key] === undefined) {

                if(this.requiredKeys.includes(key)) {
                    throw new Error(`Свойство ${key} не определено`)
                } else {
                    mappedEntity[key] = null
                }
            }

            array.push(mappedEntity[key])
        }
       
        return array
    }

    static async transaction<T>(action: TransactionAction<T>) {
        return db.transaction<T>(action)
    }

    static async transactionUpdate(connection: Connection, table: string, updateData: object, where: string) {
        return db.transactionUpdate(connection, table, updateData, where)
    }

    static async transactionInsertOne(connection: Connection, entity: unknown) {
        try {

            const valuesMapPlace = Array(this.mapKey.length).fill('?').join(',') 
            
            const result = await db.transactionInsertOne(connection, `
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

    static async transactionExecute(connection: Connection, sql: string, data?: unknown) {
        return db.transactionExecute(connection, sql, data)
    }

    static async transactionInsertMany(connection: Connection, entities: unknown[]): Promise<Result<boolean>> {
        try {

            const data = entities.map(entity => this.entityToArray(entity))

            const result = await db.transactionInsertMany(connection, `
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