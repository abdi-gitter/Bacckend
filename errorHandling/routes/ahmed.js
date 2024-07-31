const AhmedRouter = require('express').Router();
const AhmedController = require('../controllers/ahmedController');


AhmedRouter.route('/')
    .get(AhmedController)

module.exports = AhmedRouter;