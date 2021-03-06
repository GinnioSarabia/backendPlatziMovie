const express = require('express');
const MoviesService = require('../services/movies')
const {
    movieIdSchema,
    createMoviesSchema,
    updateMoviesSchema

} = require('../utils/schemas/movies')
const validationHandler = require('../utils/middleware/validationHandler')


function moviesApi(app) {

    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService();

    router.get('/', async function (req, res, next) {
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({ tags });
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });

        } catch (err) {
            next(err);
        }
    })

    router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;
        try {
            const movies = await moviesService.getMovie({ movieId });
            res.status(200).json({
                data: movies,
                message: 'movie retrive'
            });

        } catch (err) {
            next(err);
        }
    })

    router.post('/', validationHandler(createMoviesSchema), async function (req, res, next) {
        const { body: movie } = req;
        try {
            const createdMovieId = await moviesService.createMovie({ movie });
            res.status(201).json({
                data: createdMovieId,
                message: 'movie created'
            });

        } catch (err) {
            next(err);
        }
    })



    router.put('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMoviesSchema), async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;

        try {
            const updatedMovieId = await moviesService.updateMovie({ movieId, movie });
            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            });

        } catch (err) {
            next(err);
        }
    })

    router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;
        try {
            const deletedMovieId = await moviesService.deleteMovie({ movieId });
            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted'
            });

        } catch (err) {
            next(err);
        }
    })

    router.patch('/:movieId', async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;
        try {
            const patchedMovieId = await moviesService.patchMovie({ movieId, movie });
            res.status(200).json({
                data: patchedMovieId,
                message: 'movie patched'
            });

        } catch (err) {
            next(err);
        }
    })


}

module.exports = moviesApi;

