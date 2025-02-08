const tables = require('../../database/tables');

const addStack = async (req, res, next) => {
    try {
        const { name, icon } = req.body;
        const existingStack = await tables.stack.readByName(name);
        if (existingStack) {
            return res.status(409).json({ message: "Cette stack existe déjà." });
        }

        const stackId = await tables.stack.add({ name, icon });
        res.status(201).json({ idStack: stackId, name, icon });
    } catch (err) {
        next(err);
    }
};

const getAllStacks = async (req, res, next) => {    
    try {
        const stacks = await tables.stack.getAll();
        res.json(stacks);
    } catch (err) {
        next(err);
    }
};

module.exports = { addStack, getAllStacks };

