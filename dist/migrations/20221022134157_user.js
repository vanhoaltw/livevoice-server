"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('user', (table) => {
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
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.string('country');
        table.string('timezoneId');
        table.string('role');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('user');
}
exports.down = down;
//# sourceMappingURL=20221022134157_user.js.map