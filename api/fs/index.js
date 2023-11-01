 const express = require('express');
const fs = require('fs');
const router = express.Router();

const BASE_PATH = '/home/nitr0gen/apis/api/';

// POST /fs/ls - Read all files
router.post('/ls', (req, res) => {
  try {
    console.log(req.body);
    const {filename=""} = req.body;
    const files = fs.readdirSync(filename);
    res.json(files);
  } catch (error) {
    res.status(500).send('Error listing files');
  }
});

// GET /fs/read - Read a specific file
router.post('/read', (req, res) => {
  try {
    console.log(req.body);
    const { filename } = req.body;
    const content = fs.readFileSync(`${filename}`, 'utf-8');
    res.send(content);
  } catch (error) {
    res.status(500).send('Error reading file');
  }
});

// POST /fs/create - Create a new file
router.post('/create', (req, res) => {
  console.log(req.body);
  const { filename, content } = req.body;
  try {
    fs.writeFileSync(`${filename}`, content);
    res.send('File created successfully');
  } catch (error) {
    res.status(500).send('Error creating file');
  }
});

// PUT /fs/update - Update an existing file
router.post('/update', (req, res) => {
  try {
    console.log(req.body);
    const { filename, content } = req.body;
    fs.writeFileSync(`${filename}`, content);
    res.send('File updated successfully');
  } catch (error) {
    res.status(500).send('Error updating file');
  }
});

// DELETE /fs/delete - Delete a file
router.delete('/delete', (req, res) => {
  const { filename } = req.body;
  try {
    fs.unlinkSync(`${filename}`);
    res.send('File deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting file');
  }
});

// POST /fs/search - Search for a file
router.post('/search', (req, res) => {
  const { filename } = req.body;
  try {
    const files = fs.readdirSync(BASE_PATH);
    const matchingFiles = files.filter(file => file.includes(filename));
    res.json(matchingFiles);
  } catch (error) {
    res.status(500).send('Error searching for files');
  }
});

module.exports = router;