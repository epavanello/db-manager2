import { Knex } from 'knex';
import { Field } from 'src/schema';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('table').del();

  // Inserts seed entries
  await knex('table').insert([
    { id: 1, name: 'table', description: 'Tables' },
    { id: 2, name: 'field', description: 'Fields' },
  ]);

  await knex<Field>('field').insert([
    {
      name: 'azienda',
      description: 'Azienda',
      table_id: 1,
      mandatory: true,
      type: 'string',
    },
    {
      name: 'matricola',
      description: 'Matricola',
      table_id: 1,
      mandatory: true,
      type: 'string',
    },
    {
      name: 'cognome',
      description: 'Cognome',
      table_id: 1,
      mandatory: true,
      type: 'string',
    },
    {
      name: 'nome',
      description: 'Nome',
      table_id: 1,
      mandatory: true,
      type: 'string',
    },
  ]);
}
