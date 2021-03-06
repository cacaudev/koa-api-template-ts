import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id', 30).primary();
    table.string('email', 100).notNullable();
    table.string('name', 50);
    table.string('surname', 50);
    table.string('password', 30).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
