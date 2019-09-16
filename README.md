# GCP POC
This poc is to upload a CSV file in CLOUD STORAGE and then read the contents of the uploaded file in CLOUD FUNCTION with trigger resource as create storage bucket. Insert the CSV table to CLOUD MySQL in CLOUD FUNCTION and return the number of records processed on console output.
## Usage
Google Cloud Platform ,
Node js
## Description
Created a cloud storage bucket
Uploaded a CSV file regarding Electrical survey then
Created a SQL instance named gcptask and imported CSV file in it, using CLOUD SHELL logged on to mysql client with the details of SQl instance(created before)  and created database named gcptask then created a table named ENTRIES.
Created Cloud function with cloud storage trigger .
In cloud function the following code has been written
#####
###
This is to connect with CLOUD MYSQL and export mysqlpool inorder to get the results
###
const mysql = require('mysql');

/**
 * TODO(developer): specify SQL connection details
 */
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

// Connection pools reuse connections between invocations,
// and handle dropped or expired connections automatically.
let mysqlPool;

exports.mysqlPool = (req, res) => {
  // Initialize the pool lazily, in case SQL access isn't needed for this
  // GCF instance. Doing so minimizes the number of active SQL connections,
  // which helps keep your GCF instances under SQL connection limits.
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
  

  // Close any SQL resources that were declared inside this function.
  // Keep any declared in global scope (e.g. mysqlPool) for later reuse.
};
#####
Using MySQL client returned the no of records from mysql table named ENTRIES





