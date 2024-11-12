const express = require('express');

const router = express.Router();

const { add } = require('../../controllers/projectActions');

router.post('/', add);

module.exports = router;