import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import HelloVoyageur from './components/HelloVoyageur/HelloVoyageur';
import Chat from './components/Chat/Chat';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/map" exact component={HelloVoyageur} />
          <Route path="/profil" exact component={Chat} />
        </Switch>
      </div>
      <NavBar />
      
    </BrowserRouter>
  );
}

export default App;
