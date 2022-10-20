import style from './GameCard.module.css';

const GameCard = ({name, image, genres}) => {
	return(
		<>
			<div className = {style.card}>
				<img className = {style} src = {image} alt="Game"/>
				<span>{name} </span>
				<span>{genres}</span>
			</div>
		</>
	);
};

export default GameCard;