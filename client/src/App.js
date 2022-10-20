import './App.css';
import {Route} from 'react-router-dom';
import Landing from './components/landing/landing';
import Principal from './components/Principal/Principal';
import Creation from './components/Creation/Creation';

function App() {

  return (
    <>
      <Route exact path = '/' component =  {Landing} />
      <Route path = '/principal' component = {Principal} />
      <Route path = '/creation' component = {Creation} />
    </>
  );
}

export default App;
