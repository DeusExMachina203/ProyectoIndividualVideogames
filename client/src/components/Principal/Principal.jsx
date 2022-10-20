import style from './Principal.module.css';
import {useState} from 'react';
import CardDisplayer from './CardDisplayer/CardDisplayer.jsx';
import {Link} from 'react-router-dom';

const Principal = () => {

	//variables
	const[searchTerm, setSearchTerm] = useState('');


	//methods
	const searchTermHandler = (event) => {
		setSearchTerm(event.target.value);
		console.log(searchTerm);
	}; 

	return (
		<>
			<div>
				<input placeholder = "Buscar..." onChange = {searchTermHandler} value = {searchTerm}/>
				<Link to = "/creation"><button>Agregar juego</button></Link>
			</div>
			<hr />
			<CardDisplayer searchTerm = {searchTerm}/>
		</>
	);
};

export default Principal;