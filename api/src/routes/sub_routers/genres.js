const {Router} = require('express');
const {Genre} = require('../../db.js');
const {bringGenres} = require('../../third_party_requests/genre-requests.js');

const genres = Router();

genres.get('/', async (req, res) =>{
	try{
		let genre_list = await Genre.findAll();
		if(genre_list.length > 0) res.status(200).json(genre_list);
		else {
			genre_list = await bringGenres();
			await new Promise(resolve => setTimeout(resolve, 1000));
			if(genre_list.length > 0) res.status(200).json(genre_list);
			else res.status(404).json({error_message: 'no genres found. Probably third party api down'});
		}
	}catch(error){
		res.status(500).send({error_message: error.message});
	}
});


module.exports = genres;