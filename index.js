const mysql = require('mysql');
const connectionName =
  process.env.INSTANCE_CONNECTION_NAME || 'My Project 95656:us-cental1-a:gcptask9';
const dbUser = process.env.SQL_USER || 'root';
const dbPassword = process.env.SQL_PASSWORD || 'Sarika@29';
const dbName = process.env.SQL_NAME || 'gcptask';

const mysqlConfig = {
  connectionLimit: 1,
  user: dbUser,
  password: dbPassword,
  database: dbName,
};
if (process.env.NODE_ENV === 'production') {
  mysqlConfig.socketPath = `/cloudsql/${connectionName}`;
}

let mysqlPool;

exports.mysqlPool = (req, res) => {

  if (!mysqlPool) {
    mysqlPool = mysql.createPool(mysqlConfig);
  }

  mysqlPool.query('SELECT NOW() AS now', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(JSON.stringify(results));
    }
  });
  
};
