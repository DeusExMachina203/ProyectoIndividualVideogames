import {GET_GAMES, GET_OWN_GAMES, GET_GENRES,SET_ORIGIN_FILTER ,SET_GENRE_FILTER_ACTIVATION, SET_GENRE_FILTER, SET_ALFABETICAL_FILTER} from './actions.js';
const initialState = {
	games:[],
	genres:[],
	own_games:[],
	genre_filter:{
		poke: 1,
		list: []
	},
	alfabetical_filter:'',
	origin_filter: 'Todos'
};

const reducer = (state = initialState, action) => {
	switch (action.type){
		case GET_GAMES:
			return{
				...state, 
				games: action.payload
			};
			break;
		case GET_OWN_GAMES:
			return{
				...state,
				own_games: action.payload
			}
		case GET_GENRES:
			return{
				...state, 
				genres: action.payload
			};
			break;
		case SET_GENRE_FILTER:
			return{
				...state,
				genre_filter: action.payload
			};
			break;
		case SET_ALFABETICAL_FILTER:
			return{
				...state,
				alfabetical_filter: action.payload
			};
			break;
		case SET_ORIGIN_FILTER:
			return{
				...state,
				origin_filter: action.payload
			};
			break;
		default:
			return {...state};
	}
} 

export default reducer;