import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {get_games, get_own_games} from '../../../redux/actions';
import GameCard from './GameCard/GameCard';
import style from'./CardDisplayer.module.css';


const CardDisplayer = ({searchTerm}) => {

	//variables
	const dispatch = useDispatch();
	const games = useSelector(state => state.games);

	//methods
	useEffect(()=>{
		dispatch(get_own_games());
		dispatch(get_games());
	},[]);

	const a = () => {
		console.log(games);
	};

	return(
		<>
			<div className = {style.displayer}>
				{games.map(game => (<GameCard 
					name = {game.name} 
					image = {game.background_image} 
					genres={game.genres.map(genre=> genre.name).join(', ')} 
					key = {game.id}
				/>))}
			</div>
		</>
	);
};

export default CardDisplayer;