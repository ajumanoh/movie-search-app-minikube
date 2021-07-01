// Get DB details from .env file
const dotenv = require('dotenv');
dotenv.config();
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DBNAME;

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: host,
      port: port,
      database: database,
      user: user,
      password: password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },


  staging: {
    client: 'postgresql',
    connection: {
      host: host,
      port: port,
      database: database,
      user: user,
      password: password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: host,
      port: port,
      database: database,
      user: user,
      password: password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
