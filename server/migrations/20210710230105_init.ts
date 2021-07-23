import { Knex } from 'knex'

// https://lucid.app/lucidchart/invitations/accept/inv_6f202f41-953f-4e58-9b6d-00253b931cd0?viewport_loc=-624%2C-49%2C3240%2C1509%2C0_0

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('table', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('description').notNullable()
    })
    .createTable('field', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.boolean('key').notNullable()
      table.boolean('mandatory').notNullable()
      table.enum('type', ['string', 'int', 'date']).notNullable()
      table.integer('length').notNullable()
      table.string('default')

      table.integer('table_id').unsigned().notNullable()
      table.foreign('table_id').references('table.id')
    })
    .createTable('list', (table) => {
      table.increments()
      table.string('description').notNullable()

      table.integer('table_id').unsigned().notNullable()
      table.foreign('table_id').references('table.id')
    })
    .createTable('list_field', (table) => {
      table.increments()
      table.boolean('filter').notNullable()

      table.integer('list_id').unsigned().notNullable()
      table.foreign('list_id').references('list.id')
      table.integer('field_id').unsigned().notNullable()
      table.foreign('field_id').references('field.id')
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('field')
    .dropTable('table')
    .dropTable('list')
    .dropTable('list_field')
}
