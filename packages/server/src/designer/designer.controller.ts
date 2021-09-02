import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { SharedService } from 'src/shared.service'
import { Field, Table } from 'src/schema'
import { DesignerService } from './designer.service'

@Controller('/api/design/tables')
export class DesignerController {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly designerService: DesignerService,
    private readonly sharedService: SharedService
  ) {}

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
    const table = await this.sharedService.getTable(table_id)
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
    const allowedFields = this.sharedService.extract<Partial<Omit<Table, 'id' | 'name'>>>({
      description: true,
    })

    table = allowedFields(table)

    const updated = await this.knex<Table>('table').where({ id: table_id }).update(table)
    if (updated == 0) {
      this.sharedService.entityNotFoundException('Table')
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
      this.sharedService.entityNotFoundException('Table')
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
    const table = await this.sharedService.getTable(table_id)

    await this.knex<Field>('field').insert({ ...field, table_id })

    await this.designerService.createFieldOnSchema(table, field)

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
      this.sharedService.entityNotFoundException('Field')
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
    @Body() fieldDTO: Partial<Field>
  ) {
    const table = await this.sharedService.getTable(table_id)
    const previousField = await this.designerService.getField(table_id, field_id)

    const allowedFields = this.sharedService.extract<Partial<Omit<Field, 'id' | 'name' | 'table_id'>>>({
      default: true,
      description: true,
      key: true,
      length: true,
      mandatory: true,
      type: true,
    })

    fieldDTO = allowedFields(fieldDTO)

    const updated = await this.knex<Field>('field').where({ table_id, id: field_id }).update(fieldDTO)
    if (updated == 0) {
      this.sharedService.entityNotFoundException('Field')
    }
    const newField = await this.designerService.getField(table_id, field_id)

    await this.designerService.deleteFieldFromSchema(table, previousField)
    await this.designerService.createFieldOnSchema(table, newField)

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
    const table = await this.sharedService.getTable(table_id)
    const field = await this.designerService.getField(table_id, field_id)

    const deleted = await this.knex<Field>('field').where({ table_id, id: field_id }).delete()
    if (deleted == 0) {
      this.sharedService.entityNotFoundException('Field')
    }

    await this.designerService.deleteFieldFromSchema(table, field)

    return {}
  }
}
