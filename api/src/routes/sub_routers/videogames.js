const {Router} = require( 'express' );
const {Videogame} = require('../../db.js');
const {Op} = require('sequelize');

const videogames = Router();

videogames.post('/', async (req, res)=>{
	const {name, description, launch_date, rating, available_platforms} = req.body;
	if(name && description && available_platforms){
		const videogame = await Videogame.create(req.body);
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
		const videogame_list = await Videogame.findAll();
		if(videogame_list) res.status(200).json(videogame_list);
		else res.status(404).json({error_message: 'not videogames posted yet'});
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