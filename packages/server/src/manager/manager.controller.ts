import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { SharedService } from '../shared.service'
import { Table, Field, List, ListField } from 'src/schema'
import { ManagerService } from './manager.service'

@Controller('/manage/tables')
export class ManagerController {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly managerService: ManagerService,
    private readonly sharedService: SharedService
  ) {}

  /**
   * List of all table names
   * @returns array of tables
   */
  @Get()
  getAllTables() {
    return this.knex<Table>('table').select('id').select('name').select('description')
  }

  /**
   * Get current table definition
   * @param table_id table id
   * @returns detailed object of required table
   */
  @Get(':table_id')
  async getTable(@Param('table_id') table_id: number) {
    const table = await this.sharedService.getTable(table_id)
    return {
      ...table,
      fields: (await this.knex<Field>('field').where({ table_id: table.id })).map(
        ({ table_id: _, ...fieldRest }) => fieldRest
      ),

      list: await Promise.all(
        (
          await this.knex<List>('list').where({ table_id: table.id })
        ).map(async ({ table_id: _, ...listRest }) => ({
          ...listRest,
          fields: (
            await this.knex<ListField>('list_field').where({
              list_id: listRest.id,
            })
          ).map(({ list_id: _, ...fieldRest }) => fieldRest),
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
  @Get(':table_id/list/:list_id')
  async getList(
    @Param('table_id') table_id: number,
    @Param('list_id') list_id: number,
    @Query() query: Record<string, string>
  ) {
    // Get table name
    const tableName = await this.sharedService.getTableName(table_id)

    // Extract list filters
    const filters = await this.managerService.getFilterNames(table_id, list_id)

    // Calculate filter condition
    const filtersCondition = this.managerService.extractValues(query, filters)

    // Get fields to read
    const fields = await this.knex<Field>('field').where({
      table_id,
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
   * @param table_id table id
   * @param query object with keys
   * @returns matched row
   */
  @Get(':table_id/row')
  async getRow(@Param('table_id') table_id: number, @Query() query: Record<string, string>) {
    // Get table name
    const tableName = await this.sharedService.getTableName(table_id)

    // Get keys of table
    const keys = await this.managerService.getKeyNames(table_id)

    // Calculate filter condition
    const keysCondition = this.managerService.extractValues(query, keys)

    // Get fields to read
    const fields = await this.knex<Field>('field').where({
      table_id,
    })

    // Get filtered rows
    const row = await this.knex(tableName)
      .where(keysCondition)
      .select(fields.map((field) => field.name))
      .first()

    return row
  }

  /**
   * Create a new row for specified table
   * @param id table id
   * @param values object containing keys and values to insert
   * @returns empty object
   */
  @Post(':id/row')
  async createRow(@Param('id') id: number, @Body() values: Record<string, string>) {
    // Get table name
    const tableName = await this.sharedService.getTableName(id)

    await this.knex(tableName).insert(values)

    return {}
  }

  /**
   * Update a row identified by query keys
   * @param table_id table id
   * @param query object with keys
   * @param values values to update
   * @returns empty object
   */
  @Patch(':table_id/row')
  async updateRow(
    @Param('table_id') table_id: number,
    @Query() query: Record<string, string>,
    @Body() values: Record<string, string>
  ) {
    // Get table name
    const tableName = await this.sharedService.getTableName(table_id)

    // Get keys of table
    const keys = await this.managerService.getKeyNames(table_id)

    // Calculate filter condition
    const keysCondition = this.managerService.extractValues(query, keys)

    const updated = await this.knex(tableName).update(values).where(keysCondition)

    if (updated == 0) {
      this.sharedService.entityNotFoundException('Row')
    }
    return {}
  }

  /**
   * Delete a row identified by query keys
   * @param table_id table id
   * @param query object with keys
   * @returns empty object
   */
  @Delete(':table_id/row')
  async deleteRow(@Param('table_id') table_id: number, @Query() query: Record<string, string>) {
    // Get table name
    const tableName = await this.sharedService.getTableName(table_id)

    // Get keys of table
    const keys = await this.managerService.getKeyNames(table_id)

    // Calculate filter condition
    const keysCondition = this.managerService.extractValues(query, keys)

    const deleted = await this.knex(tableName).del().where(keysCondition)

    if (deleted == 0) {
      this.sharedService.entityNotFoundException('Row')
    }
    return {}
  }
}
