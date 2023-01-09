import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('user_connection', (table) => {
      table.increments()
      table.integer('followerId').references('user.id').onDelete('CASCADE')
      table.integer('followingId').references('user.id').onDelete('CASCADE')
      table.timestamp('created').defaultTo(knex.fn.now())
      table.timestamp('updated').defaultTo(knex.fn.now())
    })
    .createTable('user_block', (table) => {
      table.increments()
      table.integer('creatorId').references('user.id').onDelete('CASCADE')
      table.integer('blockUserId').references('user.id').onDelete('CASCADE')
      table.timestamp('created').defaultTo(knex.fn.now())
      table.timestamp('updated').defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_connection').dropTable('user_block')
}
