const AppError = require('../utils/AppError');
const knex =  require('../database/knex');
const { hash, compare } = require('bcryptjs');

class UsersController {
    async create (request, response) {
        const {
            name,
            email,
            password,
            avatar
        } = request.body;

        const user = await knex('users').where({ email }).first();

        if (user) {
            throw new AppError('There is already an user using this email!');
        }
        
        const encryptedPassword = await hash(password, 8);

        await knex('users').insert({
            name,
            email,
            password: encryptedPassword,
            avatar,
        });

        response.status(201).json({
            message: 'User created successfully!'
        })
    }

    async findAll (request, response) {
        const users = await knex('users').select([
            'id',
            'name',
            'email',
            'avatar'
        ]);
        response.json(users);
    }
    
    async findOne (request, response) {
        const { id } = request.params;
        const user = await knex('users')
            .select([
                'name',
                'email',
                'avatar'
            ])
            .where({ id }).first();
        if (!user) {
            throw new AppError('User not found!', 404);
        }
        response.json(user);
    }

    async update (request, response) {
        const {
            name,
            email,
            oldPassword,
            newPassword,
            avatar
        } = request.body;
        const { id } = request.user;

        
        const user = await knex('users').where({ id }).first();

        if (!user) {
            throw new AppError('User not found!', 404);
        }
        
        if (newPassword && !oldPassword) {
            throw new AppError('Current password not informed!');
        }
        
        if (newPassword && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password);
            
            if (!checkOldPassword) {
                throw new AppError('Current password is wrong!');
            }
            
            var encryptedNewPassword = await hash(newPassword, 8);
        }
        
        const updateUser = {
            name: name || user.name,
            email: email || user.email,
            password: encryptedNewPassword || user.password,
            avatar: avatar || user.avatar,
            updated_at: knex.fn.now()
        }

        await knex('users').where({ id }).update(updateUser);

        response.json({
            message: 'User updated successfully!',
            user: {
                name: updateUser.name,
                email: updateUser.email,
                avatar: updateUser.avatar,
            },
        });
    }
    
}

module.exports = UsersController;