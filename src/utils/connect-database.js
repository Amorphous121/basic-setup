const { set, connect, connection } = require('mongoose');

const { DATABASE_NAME, DB_URI } = require('../config');

const connectDB = () => {
  set('strictQuery', true);
  return connect(`${DB_URI}/${DATABASE_NAME}`);
}

connection.on('connected', () => console.log('🔥 Database Connected.'));

module.exports = {
  connectDB
};