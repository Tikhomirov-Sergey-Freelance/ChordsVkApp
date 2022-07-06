import { createPool, Pool } from 'mysql2'
import { init } from 'mysql-migrations'
import { readFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

export class Migration {

  pool: Pool

  private prodPath = resolve(__dirname, '../../..', 'ChordsPrivate/mysql-config.json')
  private devPath = resolve(__dirname, 'mysql-config.json')

  constructor() {
      this.init()
  }

  migration() {

    if (!existsSync(__dirname + '/migrations')) {
      mkdirSync(__dirname + '/migrations')
    }

    init(this.pool, __dirname + '/migrations')
  }

  private init() {

      const configPath = this.getConfigPath()

      if (!configPath) {
          throw new Error('Не найдет файл конфигурации.')
      }

      const config = JSON.parse(readFileSync(configPath).toString('utf8'))
      this.pool = createPool({ ...config, connectionLimit: 5 })

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

const migration = new Migration()
migration.migration()