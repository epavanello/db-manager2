import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Req,
  Request,
} from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { Table, Field, List, ListField } from 'src/schema'

@Controller('tables')
export class ManagerController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  // List of all table names
  @Get()
  allTables() {
    return this.knex<Table>('table')
      .select('id')
      .select('name')
      .select('description')
  }

  // Get current table definition
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

  // get list data of specified table
  // Eg. /tables/1/list/1?azienda=1
  @Get(':id/list/:list_id')
  async getList(
    @Param('id') id: number,
    @Param('list_id') list_id: number,
    @Query() query: Record<string, string>
  ) {
    const table = await this.knex<Table>('table').where({ id }).first()

    const filters = await this.knex<List>('list')
      .join<ListField>('list_field', 'list.id', '=', 'list_field.list_id')
      .join<Field>('field', 'list_field.field_id', '=', 'field.id')
      .where({ filter: true })
      .select('name')

    let filterCondition = {}
    const queryKeys = Object.keys(query).map((filter) => filter.toLowerCase())
    for (const filter of filters) {
      const key = filter.name.toLowerCase()
      if (queryKeys.indexOf(key) == -1) {
        throw new HttpException(
          `Filter '${filter.name}' missing`,
          HttpStatus.BAD_REQUEST
        )
      }
      filterCondition = { ...filterCondition, [filter.name]: query[key] }
    }

    const fields = await this.knex<Field>('field').where({
      table_id: id,
    })

    const rows = await this.knex(table.name)
      .where(filterCondition)
      .select(fields.map((field) => field.name))

    return { rows }
  }
}
