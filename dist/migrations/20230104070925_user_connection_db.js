"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .createTable('user_connection', (table) => {
        table.increments();
        table.integer('followerId').references('user.id').onDelete('CASCADE');
        table.integer('followingId').references('user.id').onDelete('CASCADE');
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    })
        .createTable('user_block', (table) => {
        table.increments();
        table.integer('creatorId').references('user.id').onDelete('CASCADE');
        table.integer('blockUserId').references('user.id').onDelete('CASCADE');
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('user_connection').dropTable('user_block');
}
exports.down = down;
//# sourceMappingURL=20230104070925_user_connection_db.js.map