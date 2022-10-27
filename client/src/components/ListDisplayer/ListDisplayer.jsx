import {useState, useEffect} from 'react';

const ListDisplayer =  ({elements, setState}) => {

	const [listElements, setListElements] = useState([]);

	useEffect(() => {
		setListElements(elements.split('%'))
	},[elements]);

	return (
		<>
			<div>
				{listElements.map(element => <span onClick ={() => {
					console.log(element);
					setState(element)}} key = {element}>{element} </span>)}
			</div>
		</>
	)

};

export default ListDisplayer;