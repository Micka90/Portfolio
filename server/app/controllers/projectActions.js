const table = require('../../database/tables');

const add = async (req, res, next) => {
  try {
    const createProject = req.body;
    const result = await table.Project.add(createProject);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { add };
