import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('table', (table) => {
      table.increments();
      table.string('name').notNullable();
    })
    .createTable('field', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.integer('table_id').unsigned();
      table.foreign('table_id').references('table.id');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('field').dropTable('table');
}
