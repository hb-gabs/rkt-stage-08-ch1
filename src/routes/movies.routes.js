const { Router } = require('express');
const MoviesController = require('../controllers/MoviesController');

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.get('/', moviesController.findAll);
moviesRouter.get('/:id', moviesController.findOne);
moviesRouter.post('/:user_id', moviesController.create);
moviesRouter.put('/:user_id/:id', moviesController.update);
moviesRouter.delete('/:id', moviesController.delete);

module.exports = moviesRouter;