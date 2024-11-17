const express = require('express');
const { add } = require('../controllers/projectActions');
const upload = require('../services/fileUpload'); // Import du middleware

const router = express.Router();

// Ajoutez le middleware `upload` à la route POST
router.post('/', upload.single('image'), add);

module.exports = router;
