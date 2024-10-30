const Movie = require('../models/Movie');

module.exports.addMovie = async (req, res) => {
    const {title, description, director, year, genre} = req.body;
    let newMovie = new Movie({
        title: title,
        director: director,
        year: year,
        description: description,
        genre: genre
    })
    await newMovie.save().then(result => {
        if(result) {
            res.status(201).send(result)
        }
    }).catch(error => console.error(error))
}

module.exports.getMovies = async (req, res) => {
    
    await Movie.find({}).then(movies => {
        if(movies) {
            res.status(200).send({movies});
        } else {
            res.status(404).send({message: "No movies found"});
        }
    }).catch(error => console.error(error));
}

module.exports.getSpecificMovie = async (req, res) => {
    
    await Movie.findById(req.params.id).then(movie => {
        if(movie) {
            res.status(200).send({movie});
        } else {
            res.status(404).send({message: "Movie not found"});
        }
    }).catch(error => console.error(error));
}

module.exports.updateMovie = async (req, res) => {
    let id = req.params.id;
    const {title, description, director, year, genre} = req.body;
    let newUpdate = {
        title: title,
        director: director,
        year: year,
        description: description,
        genre: genre
    }
    await Movie.findByIdAndUpdate(id, newUpdate, {new:true}).then(updatedMovie => {
        if(updatedMovie) {
            res.status(200).send({message: "Movie updated successfully", updatedMovie});
        } else {
            res.status(404).send({message: "Movie not found"});
        }
    }).catch(error => console.error(error));
}

module.exports.deleteMovie = async (req, res) => {
    
    await Movie.findByIdAndDelete(req.params.id).then(deletedMovie => {
        if(deletedMovie) {
            res.status(200).send({message: "Movie delete successfully"});
        } else {
            res.status(404).send({message: "Movie not found"});
        }
    }).catch(error => console.error(error));
}


module.exports.addComment = async (req, res) => {
   
    const newComment = {
        userId: req.user._id,
        comment: req.body.comment
    }

    let movie = await Movie.findOne({_id: req.params.id});
    if(!movie) {
        return res.status(404).send({message: "Movie not found"})
    }
    movie.comments.push(newComment);
    await movie.save().then(movie => {
        if(movie) {
            res.status(200).send({message: "Comment added successfully"});
        } else {
            res.status(401).send({message: "Something went wrong"});
        }
    })
}


module.exports.getComments = async (req, res) => {
    
    await Movie.findById(req.params.id).then(movie => {
        if(movie) {
            res.status(200).send({comments: movie.comments});
        } else {
            res.status(404).send({message: "Movie not found"});
        }
    }).catch(error => console.error(error));
}