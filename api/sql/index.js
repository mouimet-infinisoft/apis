 const express = require('express');
const { ConnectionPool } = require('mssql');

const router = express.Router();

// Function to deploy and execute the stored procedure script
function deployStoredProcScript(sqlScript) {
  const config = {
    user: 'sa',
    password: 'sa123',
    server: '172.20.208.1',
    database: 'Bourassa_MVC', // Replace 'your_database' with your actual database name
    options: {
      encrypt: false, // if using SSL/TLS
      trustServerCertificate: true, // if using a self-signed certificate
    },
  };

  const pool = new ConnectionPool(config);
  pool.connect()
    .then(() => {
      return pool.request().query(sqlScript);
    })
    .then(() => {
      console.log('Stored procedure script executed successfully.');
    })
    .catch((err) => {
      console.error('Error executing stored procedure script:', err);
    })
    .finally(() => {
      pool.close();
    });
}

// POST /deploy/sp - Deploy and execute stored procedure script
router.post('/deploy/sp', (req, res) => {
  try {
    console.log(req.body);
    const { script = '' } = req.body; // Assuming the script is sent in the request body
    deployStoredProcScript(script);
    res.status(200).send('Stored procedure script deployment initiated.');
  } catch (error) {
    res.status(500).send('Error deploying stored procedure script');
  }
});

module.exports = router;
