const kennyRouter = require('express').Router();

const kennyController = require('../controllers/kennyController');


kennyRouter.route('/')
    .get(kennyController)

module.exports = kennyRouter;

