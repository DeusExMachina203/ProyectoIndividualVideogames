import {useState} from 'react';
import DropDownListItem from '../DropDownListItem/DropDownListItem';
import style from './DropDownList.module.css';

const DropDownList = ({setState, name, elements}) => {

	//variables
	const [show, setShow] = useState(false);
	const elementList = elements.split(' ');

	//methods
	const showDrop = () => {
		setShow(true);
	};
	const hideDrop = () => {
		setShow(false);
	};

	return(
		<>
			<div className = {style.container} onMouseEnter={showDrop} onMouseLeave={hideDrop}>
				{name}
				{
					show?<ul className = {style.list}>
						{elementList.map(element => (
							<DropDownListItem 
							key = {element}
							value = {element}
							setState = {setState} 
							/>
						))}
					</ul>:null
				}
			</div>
		</>
	);
};

export default DropDownList;