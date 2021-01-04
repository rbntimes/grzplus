const pgp = require("pg-promise")();

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

const db = pgp(cn);

module.exports = db;

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
