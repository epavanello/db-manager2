import { Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { Field, Table } from 'src/schema'
import { SharedService } from 'src/shared.service'

@Injectable()
export class DesignerService {
  constructor(@InjectKnex() private readonly knex: Knex, private readonly sharedService: SharedService) {}

  async getField(table_id: number, field_id: number) {
    const field = await this.knex<Field>('field').where({ table_id, id: field_id }).first()
    if (!field) {
      this.sharedService.entityNotFoundException('Field')
    }
    return field
  }

  async createFieldOnSchema(table: Table, field: Field) {
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
  }

  async deleteFieldFromSchema(table: Table, field: Field) {
    await this.knex.schema.alterTable(table.name, (builder) => {
      builder.dropColumn(field.name)
    })
  }
}
