const pgp = require("pg-promise")();

// Get these values from configuration
const user = process.env.DB_USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = Number(process.env.PORT);
const database = process.env.DATABASE;

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for("MyApp.db");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = globalSymbols.indexOf(DB_KEY) > -1;

const cn = {
  host: process.env.HOST,
  port: Number(process.env.PORT),
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  max: 5, // use up to 30 connections
  ssl: {
    rejectUnauthorized: false
  }
};
if (!hasDb) {
  global[DB_KEY] = pgp(cn);
}

// Create and freeze the singleton object so that it has an instance property.
const singleton = {};
Object.defineProperty(singleton, "instance", {
  get: function() {
    return global[DB_KEY];
  }
});
Object.freeze(singleton);

module.exports = singleton;

// const pgp = require("pg-promise")();
//
// const cn = {
//   host: process.env.HOST,
//   port: Number(process.env.PORT),
//   database: process.env.DATABASE,
//   user: process.env.DB_USER,
//   password: process.env.PASSWORD,
//   max: 5, // use up to 30 connections
//   ssl: {
//     rejectUnauthorized: false
//   }
// };
//
// const db = pgp(cn);
//
// module.exports = db;

// const mysql = require("serverless-mysql");
//
// const db = mysql({
//   config: {
//     host: process.env.MSQL_HOST,
//     database: process.env.MSQL_DATABASE,
//     user: process.env.MSQL_USER,
//     password: process.env.MSQL_PASSWORD
//   }
// });
//
// exports.query = async query => {
//   try {
//     const results = await db.query(query);
//     await db.end();
//     return results;
//   } catch (error) {
//     return { error };
//   }
// };
