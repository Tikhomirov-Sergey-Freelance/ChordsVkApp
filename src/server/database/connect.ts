import mysql from 'mysql2'
import { Pool } from 'mysql2/promise'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

export type Action<T> = (connection: mysql.Connection) => Promise<T>
export type Result<T> = { error?: string, result?: T }

export class Database {

    pool: Pool

    private prodPath = resolve(__dirname, '..', 'ChordsPrivate/mysql-config.json')
    private devPath = resolve(__dirname, 'mysql-config.json')

    constructor() {
        this.init()
    }

    async query<R>(sql: string, data = null, mapper: (data: unknown) => R): Promise<Result<R>> {
        
        try {

            const values = await this.pool.query(sql, data)
            const result = mapper(values)

            return { result }

        } catch(error) {
            return { error }
        } finally {
            this.pool.end()
        }
    }

    private init() {

        const configPath = this.getConfigPath()

        if (!configPath) {
            throw new Error('Не найдет файл конфигурации.')
        }

        const config = JSON.parse(readFileSync(configPath).toString('utf8'))
        this.pool = mysql.createPool({ ...config, connectionLimit: 5 }).promise()

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
