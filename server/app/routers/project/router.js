const express = require('express');

const router = express.Router();

const { verifyToken } = require('../../services/auth');

const { add } = require('../../controllers/projectActions');

const upload = require('../../services/fileUpload');

router.post('/', upload.single('project_image'), add); // `single` pour un fichier unique

module.exports = router;
