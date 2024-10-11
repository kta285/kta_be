const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: '221.145.75.81',
  user: 'algorithm',
  password: 'Whddlzjq123$%',
  database: 'starfunding',
  port: 3306,
  connectionLimit: 10,
  waitForConnections: true,
});
module.exports = pool;
