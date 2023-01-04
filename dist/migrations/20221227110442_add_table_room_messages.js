"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('roomMessages', (table) => {
        table.increments();
        table.integer('roomId').references('room.id').onDelete('CASCADE');
        table.integer('userId').references('user.id').onDelete('CASCADE');
        table.string('text');
        table.string('messageType').defaultTo('regular');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('roomMessages');
}
exports.down = down;
//# sourceMappingURL=20221227110442_add_table_room_messages.js.map