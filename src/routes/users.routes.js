const { Router } = require('express');

const UsersController = require('../controllers/UsersController');

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get('/', usersController.findAll);
usersRoutes.get('/:id', usersController.findOne);
usersRoutes.post('/', usersController.create);
usersRoutes.put('/:id', usersController.update);
usersRoutes.delete('/:id', usersController.delete);

module.exports = usersRoutes;