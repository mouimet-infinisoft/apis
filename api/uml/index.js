const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

const router = express.Router();

router.post('/generate', (req, res) => {
  // Save the UML from req.body.uml to t.wsd
  fs.writeFile('t.wsd', req.body.uml, (err) => {
    if (err) {
      return res.status(500).send('Error writing to file');
    }

    // Run PlantUML to generate output.png
    const name = `temp_${Date.now()}_${Math.floor(Math.random() * 10000)}.png`;

    exec(
      `puml generate t.wsd -o api/images/png/${name}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).send('Error generating PNG');
        }

        res.json({
          imageUrl: `http://localhost:3010/images/png/${name}`,
        });
      }
    );
  });
});

module.exports = router;
