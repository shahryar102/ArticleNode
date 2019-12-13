import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Title from "./components/Title";
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <Title>NYT Articles Search</Title>
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route exact path="/articles" component={Articles} />
        <Route exact path="/saved" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
