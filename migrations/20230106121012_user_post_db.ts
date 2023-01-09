import { PostStatus } from '../src/generated/graphql'
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('post', (table) => {
      table.increments()
      table.string('title').nullable()
      table.string('description').nullable()
      table.json('content').nullable()
      table.integer('likeCount').defaultTo(0)
      table.integer('commentCount').defaultTo(0)
      table.integer('authorId').references('user.id').onDelete('CASCADE')
      table.string('status').defaultTo(PostStatus.Public)
      table.timestamp('created').defaultTo(knex.fn.now())
      table.timestamp('updated').defaultTo(knex.fn.now())
    })
    .createTable('post_comment', (table) => {
      table.increments()
      table.integer('postId').references('post.id').onDelete('CASCADE')
      table.integer('authorId').references('user.id').onDelete('CASCADE')
      table.string('content')
      table.boolean('isEdited')
      table.integer('likeCount').defaultTo(0)
      table.integer('commentCount').defaultTo(0)
      table.timestamp('created').defaultTo(knex.fn.now())
      table.timestamp('updated').defaultTo(knex.fn.now())
    })
    .createTable('post_reaction', (table) => {
      table.increments()
      table.integer('postId').references('post.id').onDelete('CASCADE')
      table.integer('authorId').references('user.id').onDelete('CASCADE')
      table.timestamp('created').defaultTo(knex.fn.now())
      table.timestamp('updated').defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('post').dropTable('post_comment').dropTable('post_reaction')
}
