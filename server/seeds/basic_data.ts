import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('table').del();

  // Inserts seed entries
  await knex('table').insert([
    { id: 1, name: 'table' },
    { id: 2, name: 'field' },
  ]);
}
