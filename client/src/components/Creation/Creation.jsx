import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DropDownList from '../DropDownList/DropDownList';
import ListDisplayer from '../ListDisplayer/ListDisplayer';
import style from './Creation.module.css';
import {get_genres} from '../../redux/actions';

const Creation = () => {
	//variables
	const [input, setInput] = useState({
		name:"",
		description:"",
		available_platforms:[],
		rating:-1,
		launch_date: '',
		consoles: '',
		genres: []
	});
	const genres = useSelector(state => state.genres);
	const [newConsole, setNewConsole] = useState('');
	const [newGenre, setNewGenre] = useState('')
	const [nameError, setNameError] = useState('');
	const [dateError, setDateError] = useState('');
	const [consoleError, setConsoleError] = useState('');
	const [genresError, setGenresError] = useState('')
	const [errorList, setErrorList] = useState([]);
	//methods
	const dispatch = useDispatch();
	const inputHandler = (event) => {
		setInput({
			...input,
			[event.target.name]:event.target.value
		});
	};

	const ratingHandler = (event) => {
		const result = Math.ceil(event.target.value/10);
		setInput({
			...input, 
			rating: result
		});
	};

	const platformsHandler = (value) => {
		if(!input.available_platforms.includes(value)){
			setInput({
				...input,
				available_platforms: [...input.available_platforms, value]
			});
		}else{
			let platformsCopy = input.available_platforms;
			platformsCopy = platformsCopy.filter(platform => platform !== value);
			setInput({
				...input,
				available_platforms: [...platformsCopy]
			})
		}
	};

	const genresHandler = (value) => {
		if (!input.genres.includes(value)) setInput({...input, genres:[...input.genres, value]})
		else {
			let genresCopy = input.genres;
			genresCopy = genresCopy.filter(genre => genre !== value);
			setInput({...input, genres: genresCopy})
		}
	};

	const newConsoleHandler = (event) => {
		setNewConsole(event.target.value);
	};

	const newGenreHandler = (event) => {
		setNewGenre(event.target.value);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		const Response = await fetch('http://localhost:3001/videogames', {
			method: 'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(input)
		});
		const content = await Response.json();
		console.log(content);
	};

	const nameErrorHandler = () => {
		if(input.name.length > 30) setNameError('Nombre demasiado largo (Límite: 30 caracteres)');
		else setNameError('');
	};

	const dateErrorHandler = () => {
		const now = new Date();
		const [year, month, day] = input.launch_date.split('-');
		const date = new Date(`${year}-${month}-${parseInt(day)+1}`);
		now.setHours(0,0,0,0);
		date.setHours(0,0,0,0);
		if(date > now) setDateError('Por favor, ingresa una fecha válida');
		else setDateError('');
	}
	
	const handleConsoleClickDown = () => {
		const value = newConsole;
		if(!input.consoles.map(console => console.toLowerCase()).includes(value.toLowerCase())){
			if(/^[a-z0-9]+$/.test(value)) {
				platformsHandler(value);
				setConsoleError('');
			}
			else setConsoleError('Plataforma invalida. Por favor solo usa valores alfanumericos')
		}
		else {
			platformsHandler(value);
			setConsoleError('');
		}
	};

	const handleGenreClickDown = () => {
		const value = newGenre;
		if(!input.genres.map(genre => genre.toLowerCase()).includes(value.toLowerCase())){
			if(/^[a-z0-9]+$/.test(value)) {
				genresHandler(value);
				setGenresError('');
			}
			else setGenresError('Plataforma invalida. Por favor solo usa valores alfanumericos')
		}
		else {
			genresHandler(value);
			setGenresError('');
		}
	};



	useEffect(async () => {
		dispatch(get_genres());
		const consolesResponse = await fetch("http://localhost:3001/consoles");
		const response = await consolesResponse.json();
		!response.error_message?
			setInput({...input, consoles: response.map(platform => platform.name)}):
			setInput({...input, consoles: []});
	}, []);

	useEffect(() => {
		nameErrorHandler();
	},[input.name]);

	useEffect(()=>{
		dateErrorHandler();
	}, [input.consoles]);

	useEffect(() => {
		setErrorList([nameError, dateError, consoleError]);
	}, [nameError, dateError, consoleError]);

	return(
		<>
			<ul>{errorList.map(error => error.length?(<li key = {error}>{error}</li>):'')}</ul>
			<form className = {style.game_form} onSubmit = {submitHandler}>
				<label htmlFor = "name">Game Name: </label>
				<input type = "text" name = "name" value = {input.name} onChange = {inputHandler} />
				<label htmlFor = "description">Description of the game: </label>
				<textarea type = "text" rows = "4" name = "description" value = {input.description} onChange = {inputHandler}></textarea>
				<label htmlFor = "consoles">Launch date: </label>
				<input type = "date" name = "launch_date" value = {input.launch_date} onChange = {(event) =>{
					inputHandler(event);
					dateErrorHandler();
				}} />
				<label htmlFor = "rating">Rating: </label>
				<input type = "range" name = "rating" value = {input.rating*10} onChange = {ratingHandler} /> {input.rating >= 0? input.rating/2:"Califica el juego!"}
				<label htmlFor = "available_platforms">Available platforms: </label>
				{input.consoles.length?<span>{input.consoles[0]}</span>:null}
				<ListDisplayer setState = {platformsHandler} elements = {input.available_platforms.join('%')} />
				<input type = "text" name = "new_platform" value = {newConsole} onChange = {newConsoleHandler}/> <button type = "button" onClick = {handleConsoleClickDown}>Agregar</button>
				<DropDownList splitChar = "%" setState = {platformsHandler} name = "platforms" elements = {input.consoles.length?input.consoles.join('%'):''} />
				<label htmlFor = "genres">Genres: </label>
				<ListDisplayer setState = {genresHandler} elements = {input.genres.map(genre => genre).join('%')} />
				<input type = "text" name = "new_genre" value = {newGenre} onChange = {newGenreHandler}/> <button type = "button" onClick = {handleGenreClickDown}>Agregar</button>
				<DropDownList splitChar = "%" setState = {genresHandler} name = "genres" elements = {genres.map(genre => genre.name).join('%')} />
				<button type="submit" disabled = {!input.name || !input.consoles || !input.description || !errorList.length}>Submit</button>
			</form>
		</>
	);
};

export default Creation;