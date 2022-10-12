const {Router} = require('express');
const {Genre} = require('../db.js');
const axios = require('axios');
const {API_KEY} = process.env;

const bringGenres = () => {
	axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
	.then((response) => {
		const data = response.data.results;
		data.map((genre, index) => {
			let nombre = {id:index+1, name: genre.name};
			let add_genre = Genre.create(nombre);
		});
	});
};

bringGenres();

const genres = Router();

genres.get('/', async (req, res) =>{
	let genre_list = await Genre.findAll();
	if (genre_list.length === 0) {
		genre_list = await Genre.findAll();
		res.status(200).json(genre_list);
	}
	else {
		res.status(200).json(genre_list);
	}
});

module.exports = genres;