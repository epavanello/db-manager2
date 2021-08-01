import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { query } from 'express'
import { InjectKnex, Knex } from 'nestjs-knex'
import { Field, List, ListField, Table } from 'src/schema'
import { SharedService } from 'src/shared.service'

@Injectable()
export class ManagerService {
  constructor(@InjectKnex() private readonly knex: Knex, private readonly sharedService: SharedService) {}

  /**
   * Search if all fields specified are contained inside params object and extract one object with all values
   * @param params Object containing keys and values
   * @param fieldNames List o field names to match with params
   * @returns knex condition object or HttpException
   */
  extractValues(params: Record<string, string>, fieldNames: string[]): Record<string, string> {
    let keysCondition = {}
    const paramKeys = Object.keys(params).map((filter) => filter)
    for (const fieldName of fieldNames) {
      if (paramKeys.indexOf(fieldName) == -1) {
        this.sharedService.entityNotFoundException('Parameter', fieldName)
      }
      keysCondition = { ...keysCondition, [fieldName]: params[fieldName] }
    }
    return keysCondition
  }

  /**
   * Return a list of keys for the specified table
   * @param table_id table id
   * @returns List of keys for the specified table
   */
  async getKeyNames(table_id: number) {
    // Get keys of table
    const keys = await this.knex<Field>('field').where({ table_id, key: true }).select('name')

    return keys.map((key) => key.name)
  }

  /**
   * Get field names used as a filter of specified list
   * @param table_id
   * @returns
   */
  async getFilterNames(table_id: number, list_id: number) {
    // Get keys of table
    const filters = await this.knex<List>('list')
      .join<ListField>('list_field', 'list.id', '=', 'list_field.list_id')
      .join<Field>('field', 'list_field.field_id', '=', 'field.id')
      .where('list.table_id', table_id)
      .where('list.id', list_id)
      .where({ filter: true })
      .select('name')

    return filters.map((key) => key.name)
  }
}
