const { Router } = require('express');

const TagsController = require('../controllers/TagsController');

const tagsRouter = Router();
const tagsController = new TagsController();

tagsRouter.get('/', tagsController.findAll);
tagsRouter.get('/:id', tagsController.findOne);
tagsRouter.post('/:user_id/:movie_id', tagsController.create);
tagsRouter.put('/:user_id/:id', tagsController.update);
tagsRouter.delete('/:user_id/:id', tagsController.delete);

module.exports = tagsRouter;