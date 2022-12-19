import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('user').insert([{ id: 1, email: 'rowValue1', firstName: 'Nguyen', lastName: 'Hoa', password: 'hoa2662001' }])
}
