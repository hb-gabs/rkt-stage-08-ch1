const { Router } = require('express');
const MoviesController = require('../controllers/MoviesController');
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.use(ensureAuthenticated);

moviesRouter.get('/', moviesController.findAll);
moviesRouter.get('/:id', moviesController.findOne);
moviesRouter.post('/', moviesController.create);
moviesRouter.put('/:id', moviesController.update);
moviesRouter.delete('/:id', moviesController.delete);

module.exports = moviesRouter;