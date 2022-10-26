import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {get_games, get_own_games} from '../../redux/actions';
import GameCard from '../GameCard/GameCard';
import style from'./CardDisplayer.module.css';


const CardDisplayer = ({searchTerm}) => {

	//variables
	const dispatch = useDispatch();
	const games = useSelector(state => state.games);
	const genreFilter = useSelector(state => state.genre_filter);
	const activation = useSelector(state => state.genre_filter_activation);
	const alfabeticalFilter = useSelector(state => state.alfabetical_filter)
	const [filteredGamesAlfabeticaly, setFilteredGamesAlfabeticaly] = useState([]);
	const [filteredGamesByGenre, setFilteredGamesByGenre] = useState([]);
	const [page, setPage] = useState([]);
	const [appliedAlfabeticalOrder,setAppliedAlfabeticalOrder] = useState('');
	//methods
	useEffect(()=>{
		dispatch(get_own_games());
		dispatch(get_games());
	},[]);

	useEffect(() =>{
		setPage(filteredGamesByGenre.slice(0, 15));
	},[filteredGamesByGenre]);

	useEffect(() => {
		filterGamesByName();
		filterGamesByGenre();
	},[searchTerm]);

	useEffect(() => {
		filterGamesAlfabeticaly();
	}, [filteredGamesAlfabeticaly, alfabeticalFilter]);

	useEffect(() => {
		filterGamesByGenre();
	},[genreFilter]);

	useEffect(() => {
		setFilteredGamesAlfabeticaly(games);
	},[games]);

	const filterGamesByName = () => {
		setFilteredGamesAlfabeticaly(games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase())));
	};

	const filterGamesAlfabeticaly = () => {
		const filteredGamesCopy = filteredGamesAlfabeticaly;
		if(alfabeticalFilter === 'descendente'){ 
			filteredGamesCopy.sort((previous, next) => {
				if(previous.name < next.name) return -1;
				if(previous.name > next.name) return 1;
			})
		}
		else if (alfabeticalFilter === 'ascendente'){
			filteredGamesCopy.sort((previous, next) => {
				if(previous.name < next.name) return 1;
				if(previous.name > next.name) return -1;
			})
		}
		setFilteredGamesByGenre(filteredGamesCopy);
		setPage(filteredGamesByGenre.slice(0, 15));
	};

	const filterGamesByGenre =() => {
		let filteredGamesResult = [];
		
		filteredGamesAlfabeticaly.forEach((game, index) => {
			let passValue = true;
			genreFilter.list.forEach(filter => {
				if(!game.genres.map(genre => genre.name).includes(filter)) passValue = false;
			});
			if(passValue) filteredGamesResult.push(game);
		});
		setFilteredGamesByGenre(filteredGamesResult);
	};

	const showPage = (value, games) => {
		const pageSize = 15;
		const pageValue = parseInt(value);
		if(pageValue + pageSize > games.length) return games.slice(pageValue*pageSize);
		return games.slice(pageValue*pageSize, (pageValue*pageSize)+pageSize);
	};



	const pageHandler = (event) => {
		setPage([...showPage(event.target.value, filteredGamesByGenre)]);
	};

	return(
		<>
			<div className = {style.displayer}>
				{games.length?page.map(game => (<GameCard 
					name = {game.name} 
					image = {game.background_image} 
					genres={game.genres.map(genre=> genre.name).join(', ')} 
					key = {game.id}
				/>)):<span className={style.loader}></span>}
			</div>
			<div className = {style.buttons}>
				{
					[...Array(Math.ceil(filteredGamesByGenre.length/15)).keys()].map((num) => (<button 
						key = {num}
						value = {num} 
						onClick = {pageHandler}>
						{num+1}
					</button>))
				}
			</div>
		</>
	);
};

export default CardDisplayer;