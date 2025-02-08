const express = require('express');
const router = express.Router();
const { addStack, getAllStacks } = require('../../controllers/stackActions');
const { verifyToken } = require('../../services/auth');

router.post('/', verifyToken, addStack);
router.get('/', getAllStacks);

module.exports = router;

