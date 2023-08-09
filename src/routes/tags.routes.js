const { Router } = require('express');
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const TagsController = require('../controllers/TagsController');

const tagsRouter = Router();
const tagsController = new TagsController();

tagsRouter.use(ensureAuthenticated);

tagsRouter.get('/', tagsController.findAll);
tagsRouter.get('/:id', tagsController.findOne);
tagsRouter.post('/:movie_id', tagsController.create);
tagsRouter.put('/:id', tagsController.update);
tagsRouter.delete('/:id', tagsController.delete);

module.exports = tagsRouter;