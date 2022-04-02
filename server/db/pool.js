const { Pool } = require('pg');
const fs = require('fs');

// read config file to connect to database
const database = JSON.parse(fs.readFileSync('config.json'))

// create a pool of connections
const pool = new Pool(database);


module.exports = {
  query: (text, parameters) => pool.query(text, parameters)
};

