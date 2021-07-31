import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { Field, Table } from 'src/schema'
import { DesignerService } from './designer.service'

@Controller('design/tables')
export class DesignerController {
  constructor(@InjectKnex() private readonly knex: Knex, private readonly managerService: DesignerService) {}

  /**
   * List of all table names
   * @returns array of tables
   */
  @Get()
  getAllTables(): Promise<Table[]> {
    return this.knex<Table>('table').select('id').select('name').select('description')
  }

  /**
   * Create a new table
   * @param table Object containing the table attributes
   */
  @Post()
  async createTable(@Body() table: Table) {
    await this.knex<Table>('table').insert(table)

    await this.knex.schema.createTable(table.name, (builder) => {
      builder.increments('_id')
    })

    return {}
  }

  /**
   * Get specified table
   * @param table_id table id
   * @returns specified table
   */
  @Get(':table_id')
  async getTable(@Param('table_id') table_id: number): Promise<Table> {
    const table = this.knex<Table>('table').where({ id: table_id }).first()
    if (!table) {
      throw new HttpException(`Table not found`, HttpStatus.BAD_REQUEST)
    }
    return table
  }

  /**
   * Update specified table
   * @param table_id table id
   * @param table data to update
   * @returns none
   */
  @Patch(':table_id')
  async updateTable(@Param('table_id') table_id: number, @Body() table: Partial<Table>) {
    const allowedFields = this.managerService.extract<Partial<Omit<Table, 'id' | 'name'>>>({
      description: true,
    })

    table = allowedFields(table)

    const updated = await this.knex<Table>('table').where({ id: table_id }).update(table)
    if (updated == 0) {
      throw new HttpException(`Table not found`, HttpStatus.BAD_REQUEST)
    }

    return {}
  }

  /**
   * Delete specified table
   * @param table_id table id
   * @returns none
   */
  @Delete(':table_id')
  async deleteTable(@Param('table_id') table_id: number) {
    const table = await this.knex<Table>('table').where({ id: table_id }).first()

    const deleted = await this.knex<Table>('table').where({ id: table_id }).delete()
    if (deleted == 0) {
      throw new HttpException(`Table not found`, HttpStatus.BAD_REQUEST)
    }

    this.knex.schema.dropTable(table.name)

    return {}
  }

  /**
   * List of all fields
   * @param table_id table id
   * @returns array of fields
   */
  @Get(':table_id/fields')
  getAllFields(@Param('table_id') table_id: number): Promise<Field[]> {
    return this.knex<Field>('field').where({ table_id })
  }

  /**
   * Create a new field
   * @param table_id table id
   * @param table Object containing the field attributes
   */
  @Post(':table_id/fields')
  async createField(@Param('table_id') table_id: number, @Body() field: Field) {
    const table = await this.knex<Table>('table').where({ id: table_id }).first()

    await this.knex<Field>('field').insert({ ...field, table_id })

    await this.knex.schema.alterTable(table.name, (builder) => {
      let column: Knex.ColumnBuilder
      switch (field.type) {
        case 'string':
          column = builder.string(field.name, field.length)
          break
        case 'int':
          column = builder.integer(field.name)
          break
        case 'date':
          column = builder.date(field.name)
          break
      }
      if (typeof field.default !== 'undefined') {
        column.defaultTo(field.default)
      }
    })

    return {}
  }

  /**
   * Get specified field
   * @param table_id table id
   * @param field_id field id
   * @returns specified field
   */
  @Get(':table_id/fields/:field_id')
  async getField(@Param('table_id') table_id: number, @Param('field_id') field_id: number): Promise<Table> {
    const field = await this.knex<Field>('field').where({ table_id, id: field_id }).first()
    if (!field) {
      throw new HttpException(`Field not found`, HttpStatus.BAD_REQUEST)
    }
    return field
  }

  /**
   * Update specified field
   * @param table_id table id
   * @param table data to update
   * @returns none
   */
  @Patch(':table_id/fields/:field_id')
  async updateField(
    @Param('table_id') table_id: number,
    @Param('field_id') field_id: number,
    @Body() field: Partial<Field>
  ) {
    const updated = await this.knex<Field>('field').where({ table_id, id: field_id }).update(field)
    if (updated == 0) {
      throw new HttpException(`Field not found`, HttpStatus.BAD_REQUEST)
    }
    return {}
  }

  /**
   * Delete specified field
   * @param table_id table id
   * @param field_id field id
   * @returns none
   */
  @Delete(':table_id/fields/:field_id')
  async deleteField(@Param('table_id') table_id: number, @Param('field_id') field_id: number) {
    const deleted = await this.knex<Field>('field').where({ table_id, id: field_id }).delete()
    if (deleted == 0) {
      throw new HttpException(`Field not found`, HttpStatus.BAD_REQUEST)
    }
    return {}
  }
}
