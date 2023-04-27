const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MoviesController {
    async create (request, response) {
       const {
        title,
        description,
        rating
       } = request.body;
       const { user_id } = request.params;

       const user = await knex('users').where({
        id: user_id
       }).first();
       if (!user) {
        throw new AppError('User does not exist!', 404);
       }

       const movie = await knex('movies').where({ title }).first();
       if (movie) {
        throw new AppError('There is already a movie with this title');
       }

       const ratingNumber = Number(rating);
       if (ratingNumber < 0 || ratingNumber > 5) {
        throw new AppError('Rating must be between 0 and 5.');
       }

       await knex('movies').insert({
        title,
        description,
        rating,
        user_id
       });

       response.status(201).json({
        message: 'Movie created successfully!'
       });
    }

    async findAll (request, response) {
        const movies = await knex('movies')
        .select([
            'id',
            'title',
            'description',
            'rating',
            'user_id'
        ]);
        
        const tags = await knex('tags')
            .select([
                'id',
                'name',
                'movie_id'
            ]);

        const newMovies = movies.map(movie => {
            const movieTags = tags.filter(tag => tag.movie_id === movie.id);
            movie.tags = movieTags || [];
            return movie;
        })

        response.json(newMovies);
    }
    
    async findOne (request, response) {
       const { id } = request.params;
       const movie = await knex('movies').where({ id }).first();
       if (!movie) {
        throw new AppError('Theres no movie with this ID!', 404);
       }
       response.json(movie);
    }

    async update (request, response) {
        const {
            title,
            description,
            rating
        } = request.body;
        const {
            id,
            user_id
        } = request.params;

        const movie = await knex('movies').where({ id }).first();
        if (!movie) {
            throw new AppError('This movie do not exists!', 404);
        }

        if (movie.user_id != user_id) {
            throw new AppError('This user do not own this movie!', 403);
        }

        if (rating) {
            const ratingNumber = Number(rating);
            if (ratingNumber < 0 || ratingNumber > 5) {
                throw new AppError('Rating must be between 0 and 5!');
            }
        }

        await knex('movies').where({ id }).update({
            title: title || movie.title,
            description: description || movie.description,
            rating: rating || movie.rating,
            updated_at: knex.fn.now()
        });

        response.json({
            message: 'Movie updated successfully!'
        });
    }
    
    async delete (request, response) {
        const { id } = request.params;
        await knex('movies').where({ id }).del();
        response.json({
            message: 'Movie deleted successfully!'
        });
    }
}

module.exports = MoviesController;