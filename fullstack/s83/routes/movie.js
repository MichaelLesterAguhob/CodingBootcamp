const express = require('express');
const router = express.Router();
const {verifyUser, isAdmin} = require('../auth')
const movieController = require('../controllers/movie')


router.post('/addMovie', verifyUser, isAdmin, movieController.addMovie);
router.patch('/updateMovie/:id', verifyUser, isAdmin, movieController.updateMovie);
router.delete('/deleteMovie/:id', verifyUser, isAdmin, movieController.deleteMovie);

router.get('/getMovies', verifyUser, movieController.getMovies);
router.get('/getMovie/:id', verifyUser, movieController.getSpecificMovie);
router.patch('/addComment/:id', verifyUser, movieController.addComment);
router.get('/getComments/:id', verifyUser, movieController.getComments);

module.exports = router;