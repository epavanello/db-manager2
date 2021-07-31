import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Req, Request } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { Table, Field, List, ListField } from 'src/schema'
import { ManagerService } from './manager.service'

@Controller('tables')
export class ManagerController {
  constructor(@InjectKnex() private readonly knex: Knex, private readonly managerService: ManagerService) {}

  /**
   * List of all table names
   * @returns array of tables
   */
  @Get()
  allTables() {
    return this.knex<Table>('table').select('id').select('name').select('description')
  }

  /**
   * Get current table definition
   * @param id table id
   * @returns detailed object of required table
   */
  @Get(':id')
  async getTable(@Param('id') id: number) {
    const table = await this.managerService.getTable(id)
    return {
      ...table,
      fields: (await this.knex<Field>('field').where({ table_id: table.id })).map(
        ({ table_id, ...fieldRest }) => fieldRest
      ),

      list: await Promise.all(
        (
          await this.knex<List>('list').where({ table_id: table.id })
        ).map(async ({ table_id, ...listRest }) => ({
          ...listRest,
          fields: (
            await this.knex<ListField>('list_field').where({
              list_id: listRest.id,
            })
          ).map(({ list_id, ...fieldRest }) => fieldRest),
        }))
      ),
    }
  }

  /**
   * get list data of specified table
   * Eg. /tables/1/list/1?azienda=1
   * @param id table id
   * @param list_id list id to consider
   * @param query object with list filters
   * @returns filtered table rows
   */
  @Get(':id/list/:list_id')
  async getList(@Param('id') id: number, @Param('list_id') list_id: number, @Query() query: Record<string, string>) {
    // Get table name
    const tableName = await this.managerService.getTableName(id)

    // Extract list filters
    const filters = await this.knex<List>('list')
      .join<ListField>('list_field', 'list.id', '=', 'list_field.list_id')
      .join<Field>('field', 'list_field.field_id', '=', 'field.id')
      .where({ filter: true })
      .select('name')

    // Calculate filter condition
    let filtersCondition = this.managerService.extractValues(query, filters)

    // Get fields to read
    const fields = await this.knex<Field>('field').where({
      table_id: id,
    })

    // Get filtered rows
    const rows = await this.knex(tableName)
      .where(filtersCondition)
      .select(fields.map((field) => field.name))

    return { rows }
  }

  /**
   * get list data of specified table
   * Eg. /tables/1/row?azienda=2&matricola=1
   * @param id table id
   * @param query object with keys
   * @returns matched row
   */
  @Get(':id/row')
  async getRow(@Param('id') id: number, @Query() query: Record<string, string>) {
    // Get table name
    const tableName = await this.managerService.getTableName(id)

    // Get keys of table
    const keys = await this.knex<Field>('field').where({ table_id: id, key: true }).select('name')

    // Calculate filter condition
    let keysCondition = this.managerService.extractValues(query, keys)

    // Get fields to read
    const fields = await this.knex<Field>('field').where({
      table_id: id,
    })

    // Get filtered rows
    const row = await this.knex(tableName)
      .where(keysCondition)
      .select(fields.map((field) => field.name))
      .first()

    return row
  }

  @Post(':id')
  async createRow(@Param('id') id: number, @Body() values: Record<string, string>) {
    // Get table name
    const tableName = await this.managerService.getTableName(id)

    return await this.knex(tableName).insert(values)
  }
}
