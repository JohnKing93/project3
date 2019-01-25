import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import NoMatch from "./pages/NoMatch";
import Navigation from "./components/Navigation";
import Dashboard from './pages/Dashboard';
import Ideas from './pages/Idea';
import LiveProjects from './pages/LiveProjects';
import ProjectDetail from './pages/ProjectDetail';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/home" component={Dashboard} />
          <Route exact path="/ideas" component={Ideas} />
          {/* <Route exact path="/ideas/:id" component={Detail} /> */}
          <Route exact path="/projects" component={LiveProjects} />
          <Route exact path="/projects/:id" component={ProjectDetail} />
          {/* <Route exact path="/incentives" component={Books} /> */}
          <Route exact path="/profile" component={UserProfile} />
          {/* <Route exact path="/profile/:id" component={Detail} /> */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

