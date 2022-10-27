import style from './GameCard.module.css';
import ghost from '../../media/ghost.png';
import {Link} from 'react-router-dom';

const GameCard = ({name, image, genres, id}) => {

	return(
		<>
			<Link className = {style} to = {`/principal/${id}`} >
				<div className = {style.card}>
					<img className = {style} src = {image?image:ghost} alt="Game"/>
					<span>{name} </span>
					<span>{genres}</span>
				</div>
			</Link>
		</>
	);
};

export default GameCard;