import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createStore } from "redux";
import Timer from './timer';
import TreeWidget from "./TreeWidget";
import EnhancedTreeWidget from "./EnhancedTreeWidget";

import { Provider } from "react-redux";

function reducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const store = createStore(reducer);

export default function BasicExample() {
  return (
    <Provider store={store}>
      <Router>
        <Links />
        <hr />
        <App />
      </Router>
    </Provider>
  );
}

function Links() {
  return (
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </ul>
  );
}

function App() {
  return (
    <div>
      <Switch>
       
        <Route path="/dashboard">
          <Dashboard />

        </Route>
        <Route path="/">
          <Timer />
          <TreeWidget />
          <EnhancedTreeWidget />
        </Route>
      </Switch>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
