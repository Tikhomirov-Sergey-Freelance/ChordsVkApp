import { createPool, Connection, ResultSetHeader } from 'mysql2'
import { Pool, PoolConnection } from 'mysql2/promise'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

export type Action<T> = (connection: Connection) => Promise<T>
export type Result<T> = { error?: string, result?: T }

export class Database {

    pool: Pool

    private prodPath = resolve(__dirname, '..', 'ChordsPrivate/mysql-config.json')
    private devPath = resolve(__dirname, 'mysql-config.json')

    constructor(prodPath?: string, devPath?: string) {

        if(prodPath) {
            this.prodPath = prodPath
        }

        if(devPath) {
            this.devPath = devPath
        }

        this.init()
    }

    async query<R>(sql: string, mapper: (data: unknown) => R, data: unknown[] = null): Promise<Result<R>> {
        
        return this.connect(async (connection: PoolConnection) => {
            const values = (await connection.query(sql, data)) as unknown as ResultSetHeader
            const result = mapper(values)

            return { result }
        })
    }

    async insertOne(sql: string, data: unknown[] = null): Promise<Result<ResultSetHeader>> {

        return this.connect(async (connection: PoolConnection) => {
            const result = (await connection.query(sql, data)) as unknown as ResultSetHeader
            return { result }
        })
    } 

    async insertMany(sql: string, data: unknown[] = null): Promise<Result<boolean>> {

        return this.connect(async (connection: PoolConnection) => {
            await connection.query(sql, data)
            return { result: true }
        })
    }

    async connect<T>(action: (connection: PoolConnection) => Promise<Result<T>>) {

        let connection: PoolConnection

        try {

            connection = await this.pool.getConnection()
            return action(connection)

        } catch (error) {
            return { error }
        } finally {
            if(connection?.release) {
                connection.release()
            }
        }
    }

    private init() {

        const configPath = this.getConfigPath()

        if (!configPath) {
            throw new Error('Не найдет файл конфигурации.')
        }

        const config = JSON.parse(readFileSync(configPath).toString('utf8'))
        this.pool = createPool({ ...config, connectionLimit: 20, connectTimeout: 2400 }).promise()

        process['database_connected'] = true
    }

    private getConfigPath(): string {

        if (existsSync(this.devPath)) {
            return this.devPath
        }
        
        if (existsSync(this.prodPath)) {
            return this.prodPath
        }
        
        return null
    }
}

const database = new Database()
export default database
