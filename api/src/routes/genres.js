const {Router} = require('express');
const {Genre} = require('../db.js');
const {bringGenres} = require('../third_party_requests/genre-requests.js');

const genres = Router();

genres.get('/', async (req, res) =>{
	try{
		let genre_list = await Genre.findAll();
		if(genre_list.length > 0) res.status(200).json(genre_list);
		else {
			bringGenres();
			if(genre_list.length > 0) res.status(200).json(genre_list);
			else res.status(404).send('no genres found. Probably third party api down');
		}
	}catch(error){
		res.status(500).send(error.message);
	}
});


module.exports = genres;