import {GET_GAMES, GET_OWN_GAMES, GET_GENRES} from './actions.js';
const initialState = {
	games:[],
	genres:[],
	own_games:[]
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
		default:
			return {...state};
	}
} 

export default reducer;