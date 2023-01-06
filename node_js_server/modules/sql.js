const { Client } = require('pg');
require('dotenv').config();

const sqlClientPromise = new Promise((resolve, reject) => {
	
	const client = new Client({
		host: process.env.PG_HOST,
		port: process.env.PG_PORT,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		ssl: false,
	});
	
	client.connect().then(resolve(client));
	
});

module.exports = {
	sqlClientPromise
};