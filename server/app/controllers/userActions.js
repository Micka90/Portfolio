const tables = require('../../database/tables');

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const existingUser = await tables.user.readByEmail(req.body.email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const result = await tables.user.add(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const users = await tables.user.read(req.params.id);
    if (users == null) {
      res.sendStatus(404);
    } else {
      res.json(users);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  add,
  read,
};
