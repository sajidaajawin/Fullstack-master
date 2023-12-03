const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "AXLM7N2v",
  host: "localhost",
  port: 5432,
  database: "master1",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
