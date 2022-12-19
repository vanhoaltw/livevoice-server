"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Inserts seed entries
    await knex('user').insert([{ id: 1, email: 'rowValue1', firstName: 'Nguyen', lastName: 'Hoa', password: 'hoa2662001' }]);
}
exports.seed = seed;
//# sourceMappingURL=user.js.map