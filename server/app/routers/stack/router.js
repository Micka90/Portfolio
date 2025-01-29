const express = require('express');

const router = express.Router();
const { addStack, getAllStacks } = require('../../controllers/stackActions');

router.post('/', addStack);
router.get('/', getAllStacks);

module.exports = router;

