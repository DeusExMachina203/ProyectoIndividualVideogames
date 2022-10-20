import {useState} from 'react';
import style from './Creation.module.css';

const Creation = () => {

	const [input, setInput] = useState({});
	const platforms = ['unknown','PC','PS4', 'PS3', 'PS2', 'PS', 'Wii', 'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series X/S'];

	return(
		<form className = {style.game_form}>
			<label htmlFor = "name">Game Name: </label>
			<input type = "text" name = "name" value = {input.name} />
			<label htmlFor = "description">Description of the game: </label>
			<input type = "text" name = "description" value = {input.description} />
			<label htmlFor = "launch_date">Launch date: </label>
			<input type = "date" name = "launch_date" value = {input.launch_date} />
			<label htmlFor = "rating">Rating: </label>
			<input type = "range" name = "rating" value = {input.rating} />
			<label htmlFor = "available_platforms">Available platforms: </label>
			<input list = "platforms" name = "available_platforms" value = {input.available_platforms} />
			<datalist id = "platforms">
				{platforms.map(platform => (<option value = {platform} />))}
			</datalist>
		</form>
	);
};

export default Creation;