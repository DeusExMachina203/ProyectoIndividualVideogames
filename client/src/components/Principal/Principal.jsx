import style from './Principal.module.css';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {get_genres} from '../../redux/actions';
import CardDisplayer from '../CardDisplayer/CardDisplayer.jsx';
import DropDownList from '../DropDownList/DropDownList.jsx';
import {set_genre_filter_activation, set_genre_filter, set_alfabetical_filter} from '../../redux/actions';


const Principal = () => {

	//variables
	const [searchTerm, setSearchTerm] = useState('');
	const genreFilter = useSelector(state => state.genre_filter);
	const genres = useSelector(state => state.genres);
	const alfabetical = ['ascendente', 'descendente'];

	//methods
	const dispatch = useDispatch();

	const searchTermHandler = (event) => {
		setSearchTerm(event.target.value);
	}; 

	const genreGlobalFilterHandler = (value) =>{
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

	const setAlfabeticalFilter = (value) => {
		dispatch(set_alfabetical_filter(value));
	}

	useEffect(() => {
		dispatch(get_genres());
	}, []);

	return (
		<>
			<div className = {style.top}>
				<input placeholder = "Buscar..." onChange = {searchTermHandler} value = {searchTerm}/>
				<Link to = "/creation"><button>Agregar juego</button></Link>
				<DropDownList  setState = {setAlfabeticalFilter} filterName = "alfabetico" elements = {alfabetical.join(' ')} />
				<DropDownList  setState = {genreGlobalFilterHandler} filterName = "por genero" elements = {genres.map(genre => genre.name).join(' ')} />
			</div>
			<hr />
			<CardDisplayer searchTerm = {searchTerm}/>
		</>
	);
};

export default Principal;