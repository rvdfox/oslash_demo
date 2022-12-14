require('dotenv').config();

module.exports = 
{
  development: {
    "username": "postgres",
    "password": null,
    "database": "oslashdb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  test: {
    "username": "postgres",
    "password": null,
    "database": "oslashdb_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  production: {
    "username": "postgres",
    "password": null,
    "database": "oslashdb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
