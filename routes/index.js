const express = require('express');
const router = express.Router();

router.use('/zones', require('./zones'));
router.use('/projects', require('./projects'));

module.exports = router;