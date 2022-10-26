import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DropDownList from '../DropDownList/DropDownList';
import style from './Creation.module.css';
import {get_genres} from '../../redux/actions';

const Creation = () => {
	//variables
	const [input, setInput] = useState({
		name:"",
		description:"",
		available_platforms:[],
		rating:-1,
		launch_date: new Date(0),
		genres: []
	});
	const platformsList = ['PC','PS4', 'PS3', 'PS2', 'PS', 'Wii', 'Xbox', 'Xbox-360', 'Xbox-One', 'Xbox-Series-X/S'];
	const genres = useSelector(state => state.genres);
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
		let id = 0;
		genres.forEach(genre => {
			if (genre.name === value) id = genre.id;
		});
		if (!input.genres.includes(id)) setInput({...input, genres:[...input.genres, id]})
		else {
			let genresCopy = input.genres;
			genresCopy = genresCopy.filter(genre => genre !== id);
			setInput({...input, genres: genresCopy})
		}
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

	useEffect(() => {
		dispatch(get_genres());
	}, []);

	return(
		<form className = {style.game_form} onSubmit = {submitHandler}>
			<label htmlFor = "name">Game Name: </label>
			<input type = "text" name = "name" value = {input.name} onChange = {inputHandler} />
			<label htmlFor = "description">Description of the game: </label>
			<textarea type = "text" rows = "4" name = "description" value = {input.description} onChange = {inputHandler}></textarea>
			<label htmlFor = "launch_date">Launch date: </label>
			<input type = "date" name = "launch_date" value = {input.launch_date} onChange = {inputHandler} />
			<label htmlFor = "rating">Rating: </label>
			<input type = "range" name = "rating" value = {input.rating*10} onChange = {ratingHandler} /> {input.rating >= 0? input.rating/2:"Califica el juego!"}
			<label htmlFor = "available_platforms">Available platforms: </label>
			<DropDownList setState = {platformsHandler} name = "platforms" elements = {platformsList.join(' ')} />
			<label htmlFor = "genres">Genres: </label>
			<DropDownList setState = {genresHandler} name = "genres" elements = {genres.map(genre => genre.name).join(' ')} />
			<button type="submit">Submit</button>
		</form>
	);
};

export default Creation;