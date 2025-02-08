const express = require('express');
const router = express.Router();
const {
  add,
  getAll,
  getOne,
  addStacksToProject,
  deleteProject,
  updateProject,
} = require('../../controllers/projectActions');

const upload = require('../../services/fileUpload');
const { verifyToken } = require('../../services/auth');

router.post('/', verifyToken, upload.single('project_image'), add);
router.get('/:id', getOne);
router.get('/', getAll);
router.post('/:id/stacks', verifyToken, addStacksToProject);
router.delete('/:id', verifyToken, deleteProject);
router.put('/:id', verifyToken, updateProject);

module.exports = router;
