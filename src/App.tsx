import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Neon } from './pages/Neon/Neon';
import { Pager } from './pages/Pager/Pager';
import { StarWars } from './pages/StarWars/StarWars';
import { Joe } from './pages/Joe/Joe';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/neon">
            <Neon />
          </Route>
          <Route exact path="/joe">
            <Joe />
          </Route>
          <Route exact path="/pager">
            <Pager />
          </Route>
          <Route exact path="/starwars">
            <StarWars />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
