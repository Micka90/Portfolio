const express = require('express');
const { add, browse } = require('../../controllers/userActions');
const { login, refresh, logout } = require('../../controllers/authActions');
const { hashPassword, verifyToken } = require('../../services/auth');

const router = express.Router();

router.post('/login', login);
router.get('/refresh', refresh);
router.get('/logout', logout);
router.post('/', hashPassword, add);

router.use(verifyToken);

router.get('/', browse);

module.exports = router;
