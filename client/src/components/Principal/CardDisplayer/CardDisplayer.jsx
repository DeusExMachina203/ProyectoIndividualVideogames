import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {get_games, get_own_games} from '../../../redux/actions';

const CardDisplayer = (props) => {

	//variables
	const dispatch = useDispatch();
	const games = useSelector(state => state.games);

	//methods
	useEffect(()=>{
		dispatch(get_own_games());
		dispatch(get_games());
	},[]);

	const a = () => {
		console.log(games);
	};

	return(
		<>
			<div>
				<button onClick = {a}>a</button>
			</div>
		</>
	);
};

export default CardDisplayer;