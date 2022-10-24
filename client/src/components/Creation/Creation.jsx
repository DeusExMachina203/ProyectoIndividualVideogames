import {useState} from 'react';
import style from './Creation.module.css';

const Creation = () => {

	const [input, setInput] = useState({
		name:"",
		description:"",
		launch_date:"",
		rating:-1,
		platforms:'',
	});
	const platformsList = ['unknown','PC','PS4', 'PS3', 'PS2', 'PS', 'Wii', 'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series X/S'];
	const inputHandler = (event) => {
		setInput({
			...input,
			[event.target.name]:event.target.value
		});
	};

	const platformsHandler = (event) => {

	};

	const submitHandler = (event) => {
		event.preventDefault();
		console.log(input);
	};

	return(
		<form className = {style.game_form} onSubmit = {submitHandler}>
			<label htmlFor = "name">Game Name: </label>
			<input type = "text" name = "name" value = {input.name} onChange = {inputHandler} />
			<label htmlFor = "description">Description of the game: </label>
			<textarea type = "text" rows = "4" name = "description" value = {input.description} onChange = {inputHandler}></textarea>
			<label htmlFor = "launch_date">Launch date: </label>
			<input type = "date" name = "launch_date" value = {input.launch_date} onChange = {inputHandler} />
			<label htmlFor = "rating">Rating: </label>
			<input type = "range" name = "rating" value = {input.rating} onChange = {inputHandler} />
			<label htmlFor = "available_platforms">Available platforms: </label>
			<input list = "platforms" name = "platforms" value = {input.platforms} onChange = {platformsHandler} />
			<datalist id = "platforms">
				{platformsList.map(platform => (<option value = {platform} />))}
			</datalist>
			<button type="submit">Submit</button>
		</form>
	);
};

export default Creation;