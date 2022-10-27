import ghost from '../../media/ghost.png';
import style from './GameInformation.module.css';

const GameInformation = ({img, name, genres, description, launch_date, rating, platforms}) => {
	return (
		<>
			<div className= {style.gameContainer}>
				<img src = {img?img:ghost} className = {style} />
				<span>{name} </span>
				<span>{genres} </span>
				<span>{description} </span>
				<span>{launch_date} </span>
				<span>{rating} </span>
				<span>{platforms} </span>
			</div>
		</>
	)
};

export default GameInformation;