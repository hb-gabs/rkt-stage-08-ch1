const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class TagsController {
    async create (request, response) {
       const { user_id, movie_id } = request.params;
       const { name } = request.body;

       const tag = await knex('tags').where({ name }).first();
       if (tag) {
        throw new AppError('This tag already exist.');
       }

       const user = await knex('users')
        .where({ id: user_id }).first();
        if (!user) {
            throw new AppError('User does not exists!', 404);
        }

        const movie = await knex('movies')
            .where({ id: movie_id }).first();
        if (!movie) {
            throw new AppError('Movie does not exists!', 404);
        }

        await knex('tags').insert({
            name,
            user_id,
            movie_id
        });

        response.status(201).json({
            message: 'Tag created successfully!'
        });
    }

    async findAll (request, response) {
        const tags = await knex('tags');

        response.json(tags);
    }
    
    async findOne (request, response) {
        const { id } = request.params;

        const tag = await knex('tags').where({ id });

        response.json(tag);
    }

    async update (request, response) {
        const { id, user_id } = request.params;
        const { name } = request.body;

        const tag = await knex('tags').where({ id }).first();
        if (tag.user_id != user_id) {
            throw new AppError('User does not own this tag!');
        }

        await knex('tags').where({ id }).update({
            name: name || tag.name,
        });

        response.json({
            message: 'Tag updated successfully!'
        });
    }
    
    async delete (request, response) {
        const { id, user_id } = request.params;

        const tag = await knex('tags').where({ id }).first();
        if (tag.user_id != user_id) {
            throw new AppError('User does not own this tag!');
        }

        await knex('tags').where({ id }).del();
        
        response.json({
            message: 'Tag deleted successfully'
        });
    }
}

module.exports = TagsController;