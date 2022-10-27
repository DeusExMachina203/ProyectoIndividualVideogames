import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {get_games, get_own_games} from '../../redux/actions';
import GameCard from '../GameCard/GameCard';
import style from'./CardDisplayer.module.css';


const CardDisplayer = ({searchTerm}) => {

	//variables
	const dispatch = useDispatch();
	const foreignGames = useSelector(state => state.games);
	const ownGames = useSelector(state => state.own_games);
	const genreFilter = useSelector(state => state.genre_filter);
	const activation = useSelector(state => state.genre_filter_activation);
	const alfabeticalFilter = useSelector(state => state.alfabetical_filter);
	const originFilter = useSelector(state => state.origin_filter);
	const [games, setGames] = useState([]);
	const [filteredGamesAlfabeticaly, setFilteredGamesAlfabeticaly] = useState([]);
	const [filteredGamesByGenre, setFilteredGamesByGenre] = useState([]);
	const [page, setPage] = useState([]);
	const [appliedAlfabeticalOrder,setAppliedAlfabeticalOrder] = useState('');
	const [pageNumber, setPageNumber] = useState(0);
	//methods
	useEffect(()=>{
		if(!(games.length)){
			dispatch(get_own_games());
			dispatch(get_games());
		}
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
		filterGamesByGenre();
	}, [filteredGamesAlfabeticaly, alfabeticalFilter]);

	useEffect(() => {
		filterGamesByGenre();
	},[genreFilter]);

	useEffect(() => {
		setFilteredGamesAlfabeticaly(games);
	},[games]);

	useEffect(() => {
		if(originFilter === 'Todos') setGames([...ownGames, ...foreignGames]);
		if(originFilter === 'Externo') setGames([...foreignGames]);
		if(originFilter === 'Propio') setGames([...ownGames]);
	},[foreignGames, ownGames, originFilter]);


	const filterGamesByName = () => {
		setFilteredGamesAlfabeticaly(games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase())));
	};

	const filterGamesAlfabeticaly = () => {
		const filteredGamesCopy = filteredGamesAlfabeticaly;
		if(alfabeticalFilter === 'Ascendente'){ 
			filteredGamesCopy.sort((previous, next) => {
				const isPrevious = previous.name.toLowerCase();
				const isNext = next.name.toLowerCase();
				if(isPrevious < isNext) return -1;
				if(isPrevious > isNext) return 1;
			})
		}
		else if (alfabeticalFilter === 'Descendente'){
			filteredGamesCopy.sort((previous, next) => {
				const isPrevious = previous.name.toLowerCase();
				const isNext = next.name.toLowerCase();
				if(isPrevious < isNext) return 1;
				if(isPrevious > isNext) return -1;
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
		setPageNumber(0);
	};

	const showPage = (value, games) => {
		const pageSize = 15;
		const pageValue = parseInt(value);
		if(pageValue + pageSize > games.length) return games.slice(pageValue*pageSize);
		return games.slice(pageValue*pageSize, (pageValue*pageSize)+pageSize);
	};



	const pageHandler = (event) => {
		if(event.target.value === 'prev'){
			if(pageNumber > 0){
				setPage([...showPage(pageNumber -1 , filteredGamesByGenre)]);
				setPageNumber(pageNumber - 1);
			}
		}
		else if(event.target.value === 'next'){
			if(pageNumber < Math.ceil(filteredGamesByGenre.length/15-1)){
				setPage([...showPage(pageNumber +1 , filteredGamesByGenre)]);
				setPageNumber(pageNumber+1);
			}
		}
		else{
			setPage([...showPage(event.target.value, filteredGamesByGenre)]);
			setPageNumber(parseInt(event.target.value));
		}
	};

	return(
		<>
			<div className = {style.displayer}>
				{foreignGames.length?page.map(game => (<GameCard 
					name = {game.name} 
					image = {game.background_image} 
					genres={game.genres.map(genre=> genre.name).join(', ')} 
					id = {game.id}
					key = {game.id}
				/>)):<span className={style.loader}></span>}
			</div>
			<div className = {style.buttons}>
			<button className = {style.button_paginate} value = "prev" onClick = {pageHandler} >prev</button>
				{
					[...Array(Math.ceil(filteredGamesByGenre.length/15)).keys()].map((num) => (<button 
						className = {style.button_paginate}
						key = {num}
						value = {num} 
						onClick = {pageHandler}>
						{num+1}
					</button>))
				}
			<button className = {style.button_paginate} value = "next" onClick = {pageHandler} >next</button>
			</div>
		</>
	);
};

export default CardDisplayer;