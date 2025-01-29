const express = require('express');

const router = express.Router();

// const { verifyToken } = require('../../services/auth');

const { add,getAll,getOne, addStacksToProject } = require('../../controllers/projectActions');

const upload = require('../../services/fileUpload');

router.post('/', upload.single('project_image'), add);

router.get('/:id', getOne);

router.get('/', getAll);

router.post('/:id/stacks', addStacksToProject); 

module.exports = router;
