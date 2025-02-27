const express = require('express');

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require('./user/router');

const projectRouter = require('./project/router');

const stackRouter = require('./stack/router');

router.use('/user', userRouter);

router.use('/project', projectRouter);

router.use('/stack', stackRouter);

/* ************************************************************************* */

module.exports = router;
