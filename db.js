const pgp = require("pg-promise")({});

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
