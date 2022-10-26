const {Router} = require( 'express' );
const {Videogame, Genre} = require('../../db.js');
const {Op} = require('sequelize');

const videogames = Router();

videogames.post('/', async (req, res)=>{
	const {name, description, launch_date, rating, available_platforms, genres} = req.body;
	if(name && description && available_platforms){
		const videogame = await Videogame.create(req.body);
		const genresList = await videogame.addGenres(genres);
		const a= await videogame.getGenres();
		console.log(a.map(b => b.dataValues.name));
		res.status(201).json(videogame);
	}
	else{
		res.status(401).json({error_message: 'Missing or invalid information'});
	}
});

videogames.get('/', async (req,res) => {
	try{
		if(req.query.name){
			const videogame_list = await Videogame.findAll({
				where:{
					name:{
						[Op.substring]: req.query.name
					}
				}
			});
		}
		const videogame_list = await Videogame.findAll({
			include:[{
				model: Genre,
				attributes: ['name']
			}]
		});
		
		const list = videogame_list.map(game => ({...game.dataValues, genres: game.dataValues.genres.map(genre => genre.name)}));
		console.log(list);

		if(videogame_list.length) res.status(200).json(list);
		else res.status(404).json({message: 'not videogames posted yet'});
	}catch(error){
		res.status(500).json({error_message: error.message});
	}
});

videogames.get('/:id', async (req, res) =>{
	try{
		const game = await Videogame.findByPk(req.params.id);
		if(game) res.status(200).json(game);
		else res.status(404).json({error_message: 'id not found'});
	}catch(error){
		res.status(500).send({error_message: error.message});
	}
});



module.exports = videogames;

