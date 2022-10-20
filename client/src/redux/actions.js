const GET_GAMES = "GET_GAMES";
const GET_GENRES = "GET_GENRES";
const GET_OWN_GAMES = "GET_OWN_GAMES";

const get_games = () => {
	const key = 'c281fe64559346ee8e2a1c9c99cf53a9';
	return function(dispatch){
		fetch(`https://api.rawg.io/api/games?key=${key}`)
		.then(response => response.json())
		.then(data => dispatch({type: GET_GAMES, payload: data}));
	}
}

const get_own_games = () => {
	return function(dispatch){
		fetch(`http://localhost:3001/games`)
		.then(response => response.json())
		.then(data => dispatch({type: GET_OWN_GAMES, payload: data}));
	}
}

const get_genres = () => {
	return function(dispatch){
		fetch(`http://localhost:3001/genres`)
		.then(response => response.json())
		.then(data => dispatch({type: GET_GENRES, payload: data}));
	}
}

export {get_games, get_genres, get_own_games, GET_GAMES, GET_OWN_GAMES, GET_GENRES};