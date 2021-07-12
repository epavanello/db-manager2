import { Knex } from 'knex'
import { Field, Table, List, ListField } from 'src/schema'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('table').del()
  await knex('field').del()
  await knex('list').del()
  await knex('list_field').del()

  // Inserts seed entries
  await knex<Table>('table').insert([
    { id: 1, name: 'dipen', description: 'Anagrafiche' },
  ])

  await knex<Field>('field').insert([
    {
      id: 1,
      name: 'azienda',
      description: 'Azienda',
      table_id: 1,
      key: true,
      mandatory: true,
      type: 'string',
      length: 10,
    },
    {
      id: 2,
      name: 'matricola',
      description: 'Matricola',
      table_id: 1,
      key: true,
      mandatory: true,
      type: 'string',
      length: 10,
    },
    {
      id: 3,
      name: 'cognome',
      description: 'Cognome',
      table_id: 1,
      key: false,
      mandatory: true,
      type: 'string',
      length: 50,
    },
    {
      id: 4,
      name: 'nome',
      description: 'Nome',
      table_id: 1,
      key: false,
      mandatory: true,
      type: 'string',
      length: 50,
    },
  ])

  await knex<List>('list').insert([
    {
      id: 1,
      description: 'Dipendenti',
      table_id: 1,
    },
  ])

  await knex<ListField>('list_field').insert([
    {
      id: 1,
      list_id: 1,
      field_id: 1,
      filter: true,
    },
    {
      id: 2,
      list_id: 1,
      field_id: 2,
      filter: true,
    },
    {
      id: 3,
      list_id: 1,
      field_id: 3,
      filter: false,
    },
    {
      id: 4,
      list_id: 1,
      field_id: 4,
      filter: false,
    },
  ])
}
