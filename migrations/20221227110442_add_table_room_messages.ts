import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('roomMessages', (table) => {
    table.increments()
    table.integer('roomId').references('room.id').onDelete('CASCADE')
    table.integer('userId').references('user.id').onDelete('CASCADE')
    table.string('text')
    table.string('messageType').defaultTo('regular')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('roomMessages')
}
