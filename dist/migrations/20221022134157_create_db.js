"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const graphql_1 = require("./../src/generated/graphql");
async function up(knex) {
    return knex.schema
        .createTable('user', (table) => {
        table.increments();
        table.string('email').notNullable();
        table.boolean('emailConfirmed').defaultTo(false);
        table.string('displayName');
        table.string('firstName', 25).notNullable();
        table.string('lastName', 25).notNullable();
        table.string('password').notNullable();
        table.timestamp('birthDay');
        table.string('gender');
        table.string('phone');
        table.string('avatar');
        table.string('avatarThumbUrl');
        table.timestamp('lastActive').defaultTo(knex.fn.now());
        table.string('country');
        table.string('timezoneId');
        table.string('role');
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    })
        .createTable('topic', (table) => {
        table.increments();
        table.string('title').notNullable();
        table.string('slug').notNullable();
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    })
        .createTable('topic_connection', (table) => {
        table.increments();
        table.integer('roomId').references('room.id').onDelete('RESTRICT');
        table.integer('topicId').references('topic.id').onDelete('RESTRICT');
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    })
        .createTable('room', (table) => {
        table.increments();
        table.string('title').notNullable();
        table.text('description');
        table.string('thumbUrl');
        table.string('status').defaultTo(graphql_1.RoomStatus.Close);
        table.timestamp('start').defaultTo(knex.fn.now());
        table.timestamp('end');
        table.string('type').defaultTo(graphql_1.RoomType.Public);
        table.string('playbackId');
        table.integer('playsCount').defaultTo(0);
        table.boolean('allowChat').defaultTo(false);
        table.integer('creatorId').references('user.id').onDelete('RESTRICT');
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    })
        .createTable('room_audience', function (table) {
        table.increments();
        table.integer('roomId').references('room.id').onDelete('CASCADE');
        table.integer('userId').references('user.id').onDelete('CASCADE');
        table.string('role');
        table.boolean('isInRoom').defaultTo(false);
        table.boolean('isHandUp').defaultTo(false);
        table.boolean('isMuted').defaultTo(false);
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('user');
}
exports.down = down;
//# sourceMappingURL=20221022134157_create_db.js.map