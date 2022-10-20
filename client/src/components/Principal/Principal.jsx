import style from './Principal.css';
import {useState} from 'react';
import CardDisplayer from './CardDisplayer/CardDisplayer.jsx';

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
			<input placeholder = "Buscar..." onChange = {searchTermHandler} value = {searchTerm}/>
			<hr />
			<CardDisplayer searchTerm = {searchTerm}/>
		</>
	);
};

export default Principal;