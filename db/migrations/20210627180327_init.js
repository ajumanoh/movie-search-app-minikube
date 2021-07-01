
exports.up = function (knex) {

  return knex.schema.hasTable('users').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('users', function (t) {
        t.increments('id').primary();
        t.string('first_name', 50);
        t.string('last_name', 50).notNullable();
        t.string('email_id', 30).notNullable().unique();
        t.text('password').notNullable();
        t.timestamps(true, true);
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.hasTable('users').then(function (exists) {
    if (exists) {
      knex.schema.dropTable('users');
    }
  });
};
