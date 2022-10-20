import style from './landing.module.css';
import {Link} from 'react-router-dom';
import kirby from '../../media/kirby.png';

const Landing = (props) => {

	return(
		<>
			<img src ={kirby} alt = "kirby characters" />
			<h1 className = {`${style.title}`}> im the landing page </h1>
			<Link to = '/principal' ><button>click</button></Link>
		</>
	);
};

export default Landing;