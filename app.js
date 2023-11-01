const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());
app.use(cors())
app.use(bodyParser.json());

// Load API modules dynamically
const apiFolderPath = path.join(__dirname, 'api');
fs.readdir(apiFolderPath, (err, folders) => {
  if (err) {
    console.error(`Error reading ${apiFolderPath}: ${err}`);
    return;
  }

  folders.forEach(folder => {
    const indexPath = path.join(apiFolderPath, folder, 'index.js');

    try {
      const apiModule = require(indexPath);
      // Create route dynamically for each API module
      app.use(`/${folder}`, apiModule);
      console.log(`Dynamic route loaded: /${folder}`);
    } catch (err) {
      console.error(`Error loading ${indexPath}: ${err}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});