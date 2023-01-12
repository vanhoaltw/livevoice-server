"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const graphql_1 = require("../src/generated/graphql");
async function up(knex) {
    return knex.schema
        .createTable('post', (table) => {
        table.increments();
        table.string('title').nullable();
        table.string('description').nullable();
        table.json('content').nullable();
        table.integer('likeCount').defaultTo(0);
        table.integer('commentCount').defaultTo(0);
        table.integer('authorId').references('user.id').onDelete('CASCADE');
        table.string('status').defaultTo(graphql_1.PostStatus.Public);
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    })
        .createTable('post_comment', (table) => {
        table.increments();
        table.integer('postId').references('post.id').onDelete('CASCADE');
        table.integer('authorId').references('user.id').onDelete('CASCADE');
        table.string('content');
        table.json('attachment');
        table.boolean('isEdited');
        table.integer('likeCount').defaultTo(0);
        table.integer('commentCount').defaultTo(0);
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    })
        .createTable('post_reaction', (table) => {
        table.increments();
        table.integer('postId').references('post.id').onDelete('CASCADE');
        table.integer('authorId').references('user.id').onDelete('CASCADE');
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('post_comment').dropTable('post_reaction').dropTable('post');
}
exports.down = down;
//# sourceMappingURL=20230106121012_user_post_db.js.map