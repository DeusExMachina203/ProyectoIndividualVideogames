import style from './Principal.module.css';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {get_genres} from '../../redux/actions';
import CardDisplayer from '../CardDisplayer/CardDisplayer.jsx';
import DropDownList from '../DropDownList/DropDownList.jsx';
import ListDisplayer from '../ListDisplayer/ListDisplayer';
import {set_genre_filter, set_alfabetical_filter, set_origin_filter} from '../../redux/actions';


const Principal = () => {

	//variables
	const [searchTerm, setSearchTerm] = useState('');
	const genreFilter = useSelector(state => state.genre_filter);
	const alfabeticalFilter = useSelector(state => state.alfabetical_filter);
	const originFilter = useSelector(state => state.origin_filter);
	const genres = useSelector(state => state.genres);
	const alfabetical = ['Ascendente', 'Descendente'];
	const origin = ['Propio', 'Externo', 'Todos'];

	//methods
	const dispatch = useDispatch();

	const searchTermHandler = (event) => {
		setSearchTerm(event.target.value);
	}; 

	const genreFilterHandler = (value) =>{
		let genreFilterCopy = genreFilter.list;
		if(genreFilterCopy.includes(value)){
			genreFilterCopy.every((filter, index) => {
 				if(filter === value) {
 					genreFilterCopy.splice(index, 1);
 					return false;
 				}
 				return true;
 			})
		}else{
			genreFilterCopy = [...genreFilterCopy, value];
		}
		dispatch(set_genre_filter({poke: (genreFilter.poke*-1), list: genreFilterCopy}));
		console.log(genreFilterCopy);
	}

	const alfabeticalFilterHandler = (value) => {
		dispatch(set_alfabetical_filter(value));
	}

	const originFilterHandler = (value) => {
		dispatch(set_origin_filter(value));
	}

	const resetFilters = () => {
		dispatch(set_alfabetical_filter(''));
		dispatch(set_origin_filter('Todos'));
		dispatch(set_genre_filter({poke: (genreFilter.poke*-1), list: []}));
	}

	useEffect(() => {
		dispatch(get_genres());
	}, []);

	return (
		<>
			<div className = {style.top}>
				<div className = {style.top_centered}>
					<input placeholder = "Buscar..." onChange = {searchTermHandler} value = {searchTerm} className = {style.search_bar}/>
					<Link to = "/creation" className = {style.add_game_link}><button className = {style.add_game_button}>Agregar juego</button></Link>
				</div>
				<div className = {style.filter_stuff}>
					<button className = {style.reset_filters_button} onClick = {resetFilters}>Reiniciar filtros</button>
					<div className = {style.filter_lists}>
						<DropDownList splitChar = "%" setState = {alfabeticalFilterHandler} name = "Alfabetico" elements = {alfabetical.join('%')} />
						<DropDownList splitChar = "%" setState = {genreFilterHandler} name = "Por genero" elements = {genres.map(genre => genre.name).join('%')} />
						<DropDownList splitChar = "%" setState = {originFilterHandler} name = "Por origen" elements = {origin.join('%')} />
					</div>
					<span>Filtros aplicados:</span>
					<div className = {style.list_of_list_of_filters}>
						<ListDisplayer name = "Alfabético" elements = {alfabeticalFilter} setState = {alfabeticalFilterHandler} />
						<ListDisplayer name = "Géneros" elements = {genreFilter.list.map(genre => genre).join('%')} setState = {genreFilterHandler} />
						<ListDisplayer name = "Origen" elements = {originFilter} setState = {originFilterHandler} />
					</div>
				</div>
			</div>
			<hr />
			<CardDisplayer searchTerm = {searchTerm}/>
		</>
	);
};

export default Principal;