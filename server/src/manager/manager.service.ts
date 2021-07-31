import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import { Table } from 'src/schema'

@Injectable()
export class ManagerService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getTable(id: number): Promise<Table> {
    return await this.knex<Table>('table').where({ id }).first()
  }

  async getTableName(id: number): Promise<string> {
    return (await this.knex<Table>('table').where({ id }).select('name').first()).name
  }

  /**
   * Search if all fields specified are contained inside params object and extract one object with all values
   * @param params Object containing keys and values
   * @param fieldNames List o field names to match with params
   * @returns knex condition object or HttpException
   */
  extractValues(params: Record<string, string>, fieldNames: { name: string }[]): Record<string, string> {
    let keysCondition = {}
    const paramKeys = Object.keys(params).map((filter) => filter)
    for (const fieldName of fieldNames) {
      if (paramKeys.indexOf(fieldName.name) == -1) {
        throw new HttpException(`Missing parameter '${fieldName.name}'`, HttpStatus.BAD_REQUEST)
      }
      keysCondition = { ...keysCondition, [fieldName.name]: params[fieldName.name] }
    }
    return keysCondition
  }
}
