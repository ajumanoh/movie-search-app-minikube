const knex = require('knex');
const knexfile = require('./knexfile');
const dotenv = require('dotenv');
dotenv.config();
const environment = process.env.DB_ENVIRONMENT;

//Select configuration based on the environment variable
if (environment === 'development')  {
    const db = knex(knexfile.development);
    module.exports = db;
} else if (environment === 'staging')  {
    const db = knex(knexfile.staging);
    module.exports = db;
} else if (environment === 'production') {
    const db = knex(knexfile.production);
    module.exports = db;
} else {
    console.log("Invalid environment value set in environment variable");
}
