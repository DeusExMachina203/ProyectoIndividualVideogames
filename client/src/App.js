import './App.css';
import {Route} from 'react-router-dom';
import Landing from './components/landing/landing';
import Principal from './components/Principal/Principal';

function App() {

  return (
    <>
      <Route exact path = '/' component =  {Landing} />
      <Route path = '/principal' component = {Principal} />
    </>
  );
}

export default App;
