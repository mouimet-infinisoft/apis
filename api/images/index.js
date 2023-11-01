const express = require('express');

const router = express.Router();

router.use(express.static('api/images/png'));

module.exports = router;