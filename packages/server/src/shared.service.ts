import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { Table } from 'src/schema'

@Injectable()
export class SharedService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  extract<T>(properties: Record<keyof T, true>) {
    return function <TActual extends T>(value: TActual) {
      const result = {} as T
      for (const property of Object.keys(properties) as Array<keyof T>) {
        result[property] = value[property]
      }
      return result
    }
  }

  async getTable(id: number): Promise<Table> {
    const table = await this.knex<Table>('table').where({ id }).first()
    if (!table) {
      this.entityNotFoundException('Table')
    }
    return table
  }

  async getTableName(id: number): Promise<string> {
    return (await this.knex<Table>('table').where({ id }).select('name').first()).name
  }

  entityNotFoundException(entityName: string, value?: string) {
    throw new HttpException(
      `${entityName} not found${typeof value !== 'undefined' ? ' - ' + value : ''}`,
      HttpStatus.BAD_REQUEST
    )
  }
}
