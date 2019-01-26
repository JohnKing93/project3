import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import Wrapper from "./components/Wrapper";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/home" component={Books} />
          <Route exact path="/ideas" component={Books} />
          <Route exact path="/ideas/:id" component={Detail} />
          <Route exact path="/projects" component={Books} />
          <Route exact path="/projects/:id" component={Detail} />
          <Route exact path="/incentives" component={Books} />
          <Route exact path="/profile" component={Books} />
          <Route exact path="/profile/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

