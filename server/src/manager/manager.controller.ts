import { ConsoleLogger, Controller, Get, Param } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { Table, Field, List, ListField } from 'src/schema'

@Controller('tables')
export class ManagerController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Get()
  allTables() {
    return this.knex<Table>('table')
      .select('id')
      .select('name')
      .select('description')
  }

  @Get('/test')
  test() {
    return this.knex<ListField>('list_field')
  }

  @Get(':id')
  async getTable(@Param('id') id: number) {
    const table = await this.knex<Table>('table').where({ id }).first()
    return {
      ...table,
      fields: (
        await this.knex<Field>('field').where({ table_id: table.id })
      ).map(({ table_id, ...fieldRest }) => fieldRest),

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
}
