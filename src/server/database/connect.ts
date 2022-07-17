import { createPool, ResultSetHeader, FieldPacket } from 'mysql2'
import { Pool, PoolConnection } from 'mysql2/promise'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

export type Action<T> = (connection: Connection) => Promise<T>
export type Result<T> = { error?: string, result?: T }
export type Mapper<R> = (data: unknown[][], keys: FieldPacket[]) => R
export type RequestData = {
    limit?: number
    offset?: number
    orderby?: string
}
export type Connection = PoolConnection

export type TransactionAction<T> = (connection: Connection) => Promise<Result<T>>

export class Database {

    pool: Pool

    private prodPath = resolve(__dirname, '..', 'ChordsPrivate/mysql-config.json')
    private devopsPath = resolve(__dirname, '../../..', 'ChordsPrivate/mysql-config.json')
    private devPath = resolve(__dirname, 'mysql-config.json')

    constructor() {

        this.init()
    }

    async query<R>(sql: string, requestData: RequestData = {}): Promise<Result<R[]>> {

        const _sql = this.prepareQuerySql(sql, requestData)

        return this.connect(async (connection: PoolConnection) => {
            const [rows] = await connection.query(_sql)
            return { result: rows as R[] }
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

    async transaction<T>(action: TransactionAction<T>) {

        return this.connect(async (connection: PoolConnection) => {

            await connection.beginTransaction()
            const { error, result } = await this.transactionAction<T>(connection as Connection, action)

            if(error) {
                throw error
            }

            return result
        })
    }

    async transactionAction<T>(connection: Connection, action: TransactionAction<T>): Promise<Result<T>>  {

        try {
            return await action(connection)  
        } catch (error) {
            return { error }
        }
    }

    async transactionQuery<R>(
        connection: Connection,
        sql: string,
        requestData: RequestData = {}): Promise<Result<R[]>> {

        const _sql = this.prepareQuerySql(sql, requestData)

        return this.transactionAction<R[]>(connection, async () => {
            const [rows] = await connection.query(_sql)
            return { result: rows as R[] }
        })
    }

    async transactionInsertOne(
        connection: Connection,
        sql: string,
        data: unknown[] = null): Promise<Result<ResultSetHeader>> {
        return this.transactionAction(connection, async () => {
            const result = (await connection.query(sql, data)) as unknown as ResultSetHeader
            return { result }
        })
    }

    async transactionInsertMany(
        connection: Connection,
        sql: string,
        data: unknown[] = null): Promise<Result<boolean>> {
        return this.transactionAction(connection, async () => {
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
            if (connection?.release) {
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

        if (existsSync(this.devopsPath)) {
            return this.devopsPath
        }

        if (existsSync(this.prodPath)) {
            return this.prodPath
        }

        return null
    }

    private prepareQuerySql(sql: string, requestData: RequestData = {}): string {

        const limit = requestData.limit ?
            `LIMIT ${requestData.limit} OFFSET ${requestData.offset || 0}` : ''

        const orderby = requestData.orderby ? `ORDERBY ${requestData.orderby}` : ''

        const _sql = `
            ${sql}
            ${orderby}
            ${limit}
        `

        return _sql
    }
}

const database = new Database()
export default database
