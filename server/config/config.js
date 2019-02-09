require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'progro',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 't7ikwtfmr9ljhmv4',
    password: 'zt91nvf61gvojw85',
    database: 'dj83pq13usqh126x',
    host: 'enqhzd10cxh7hv2e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
  },
};
