import './App.css';
import {Route} from 'react-router-dom';
import Landing from './components/landing/landing';
import Principal from './components/Principal/Principal';
import Creation from './components/Creation/Creation';
import GamePage from './components/GamePage/GamePage';
require("dotenv").config();
function App() {

  return (
    <>
      <Route exact path = '/' component =  {Landing} />
      <Route exact strict path = '/principal' component = {Principal} />
      <Route path = '/principal/:id' component = {GamePage} />
      <Route path = '/creation' component = {Creation} />
    </>
  );
}

export default App;
