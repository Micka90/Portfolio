const express = require('express');

const router = express.Router();

const { verifyToken } = require('../../services/auth');

const { add,getAll } = require('../../controllers/projectActions');

const upload = require('../../services/fileUpload');

router.post('/', upload.single('project_image'), add);
router.get('/', getAll);

module.exports = router;
