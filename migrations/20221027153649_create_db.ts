import { RoomStatus, RoomType } from './../src/generated/graphql'
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('user', (table) => {
      table.increments()
      table.string('email').notNullable()
      table.boolean('emailConfirmed').defaultTo(false)
      table.string('displayName').notNullable()
      table.string('username').notNullable()
      table.string('password').notNullable()
      table.timestamp('birthDay')
      table.string('gender')
      table.text('bio')
      table.string('phone')
      table.string('avatarUrl')
      table.string('bannerUrl')
      table.string('city')
      table.string('country')
      table.string('job')
      table.string('school')
      table.string('favorite')
      table.timestamp('lastActive').defaultTo(knex.fn.now())
      table.timestamp('created').defaultTo(knex.fn.now())
      table.timestamp('updated').defaultTo(knex.fn.now())
    })
    .createTable('room', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.text('description')
      table.text('notification')
      table.string('imageUrl')
      table.string('status').defaultTo(RoomStatus.Close)
      table.timestamp('start').defaultTo(knex.fn.now())
      table.timestamp('end')
      table.string('type').defaultTo(RoomType.Public)
      table.string('password')
      table.string('playbackId')
      table.boolean('allowChat').defaultTo(true)
      table.integer('creatorId').references('user.id').onDelete('CASCADE')
      table.boolean('freeMic').defaultTo(false)
      table.string('mode')
      table.string('seatLocked')
      table.timestamp('created').defaultTo(knex.fn.now())
      table.timestamp('updated').defaultTo(knex.fn.now())
    })
    .createTable('room_audience', function (table) {
      table.increments()
      table.integer('roomId').references('room.id').onDelete('CASCADE')
      table.integer('userId').references('user.id').onDelete('CASCADE')
      table.string('role')
      table.integer('seat')
      table.boolean('isInRoom').defaultTo(false)
      table.boolean('isHandUp').defaultTo(false)
      table.boolean('isMuted').defaultTo(false)
      table.timestamp('created').defaultTo(knex.fn.now())
      table.timestamp('updated').defaultTo(knex.fn.now())
    })
  // .createTable('tag', (table) => {
  //   table.increments()
  //   table.string('title').notNullable()
  //   table.string('slug').notNullable()
  //   table.timestamp('created').defaultTo(knex.fn.now())
  //   table.timestamp('updated').defaultTo(knex.fn.now())
  // })
  // .createTable('tag_connection', (table) => {
  //   table.increments()
  //   table.integer('roomId').references('room.id').onDelete('CASCADE')
  //   table.integer('tagId').references('tag.id').onDelete('CASCADE')
  //   table.timestamp('created').defaultTo(knex.fn.now())
  //   table.timestamp('updated').defaultTo(knex.fn.now())
  // })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user').dropTable('room').dropTable('room_connection').dropTable('room_audience')
  // .dropTable('tag')
  // .dropTable('tag_connection')
}
