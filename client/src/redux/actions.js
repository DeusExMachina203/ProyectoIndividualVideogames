require("dotenv").config();
const GET_GAMES = "GET_GAMES";
const GET_GENRES = "GET_GENRES";
const GET_OWN_GAMES = "GET_OWN_GAMES";
const SET_GENRE_FILTER = 'SET_GENRE_FILTER';
const SET_ALFABETICAL_FILTER = 'SET_ALFABETICAL_FILTER';
const SET_GENRE_FILTER_ACTIVATION = 'SET_GENRE_FILTER_ACTIVATION';
const {API_KEY} = process.env;

const get_games = () => {
	return function(dispatch){
		const pages = [...Array(5).keys()];
		pages.shift();
		Promise.all(
			pages.map(page => fetch(`https://api.rawg.io/api/games?key=c281fe64559346ee8e2a1c9c99cf53a9&page_size=25&page=${page}`))
		)
		.then(responses => Promise.all(responses.map(response => response.json())))
		.then(data => data.forEach(each => dispatch({type: GET_GAMES, payload: each.results})));
	}
}

const get_own_games = () => {
	return function(dispatch){
		fetch(`http://localhost:3001/videogames`)
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

const set_genre_filter = (value) => {
	return{type: SET_GENRE_FILTER, payload: value};
};

const set_alfabetical_filter =(value) => {
	return {type: SET_ALFABETICAL_FILTER, payload: value};
}


export {
	get_games,
 	get_genres, 
 	get_own_games,
	set_genre_filter, 
 	set_alfabetical_filter, 
 	GET_GAMES, GET_OWN_GAMES, 
 	GET_GENRES, 
 	SET_GENRE_FILTER, 
 	SET_ALFABETICAL_FILTER,
 	SET_GENRE_FILTER_ACTIVATION
};