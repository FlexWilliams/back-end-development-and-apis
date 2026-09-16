import express from "express";
import { getWatchlist, addMovie, updateMovie, deleteMovie} from '../utils/db.js';
import {authenticate} from "../middleware/authenticate.js";
import {authorizeModification} from "../middleware/authorize.js";

const router = express.Router();

router.get('/:userId', authenticate, async (req, res, next) => {
    const userId = req.params.userId;
    
    console.log(`fetching watchlist for ${userId}`);

    const watchlist = getWatchlist(parseInt(userId));

    console.log(`User watchlist: ${watchlist?.length}`);

    res.status(200).json(watchlist);
});

router.post('/:userId/movies', authenticate, authorizeModification, async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    
    const movieData = req.body;

    console.log(`adding movie for ${userId}`);
    console.log(`movie data: ${JSON.stringify(movieData)}`);

    const movie = addMovie(userId, movieData);

    res.status(201).json(movie);
});

router.put('/:userId/movies/:movieId', authenticate, authorizeModification, async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const movieId = parseInt(req.params.movieId);

    const updates = req.body;

    console.log(`updates: ${JSON.stringify(updates)}`);
    
    console.log(`updating movie ${movieId} for ${userId}`);

    const movie = updateMovie(userId);

    res.status(200).json({});
});

router.delete('/:userId/movies/:movieId', authenticate, authorizeModification, async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const movieId = parseInt(req.params.movieId);
    
    console.log(`deleting movie ${movieId} for ${userId}`);

    deleteMovie(userId, movieId);

    res.status(200).send();
});

export default router;

