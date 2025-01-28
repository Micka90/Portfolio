const tables = require ('../../database/tables')

const addStack = async (req, res, next) => {
    try {
        const {name , iconeé} = req.body;
        const stackId = await tables.Stack.add({ name, icon });
        res.status(201).json({idstack: stackId, name, icon});
    } catch (err) {
        next(err);
    }       
}

const getAllStacks = async (req, res, next) => {    
    try {
        const stacks = await tables.Stack.getAll();
        res.json(stacks);
    } catch (err) {
        next(err);
    }
}

module.exports = {addStack, getAllStacks}