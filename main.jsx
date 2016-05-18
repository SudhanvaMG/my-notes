import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/lib/app-bar';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router, Route, IndexRoute, Link} from 'react-router';
import Card from 'material-ui/lib/card/card';
import HomePage from './jsx/classes/HomePage.jsx'
import { browserHistory } from 'react-router'
import Paper from 'material-ui/lib/paper';
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import EditPage from "./jsx/classes/EditPage.jsx"
import DashboardPage from "./jsx/classes/DashboardPage.jsx"
import Layout from "./jsx/classes/Layout.jsx"

ReactDOM.render((
  <div>
    
      <Router history={browserHistory}>
        <Route name="login" path="/" component={HomePage}/>
        <Route name="dashboard" path="dashboard" component={DashboardPage}>
        <Route path="/edit" name="edit" component={EditPage}/>
        <Route path="/notes" name="notes" component={Layout}/>

        </Route>    
      </Router>
    
  </div>
),
document.getElementById('component'));

