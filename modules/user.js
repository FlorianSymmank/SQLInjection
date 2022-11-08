// https://northflank.com/guides/connecting-to-a-postgresql-database-using-node-js
// https://node-postgres.com/

const { Client } = require('pg');
require("dotenv").config();

async function getUser(req, response) {
    
    (async () => {
      const client = new Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        ssl: false,
      });
      await client.connect();
      const res = await client.query('SELECT $1::text as connected', ['Connection to postgres successful!']);
      console.log(res.rows[0].connected);
      await client.end();
    })();

  response.status(201);
  response.send();
}
module.exports = {
  getUser,
};
