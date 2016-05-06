import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/lib/app-bar';
import PanelLeft from './jsx/classes/PanelLeft.jsx'
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router, Route, IndexRoute, Link} from 'react-router';
import Card from 'material-ui/lib/card/card';
import IssueForm from './jsx/classes/Issue.jsx'
import ReturnBookForm from './jsx/classes/ReturnBook.jsx'
import AddBookForm from './jsx/classes/AddBook.jsx'
import RegisterBorrower from './jsx/classes/Register.jsx'
import HomePage from './jsx/classes/HomePage.jsx'
import SearchBook from './jsx/classes/SearchBook.jsx'
import { browserHistory } from 'react-router'
import Paper from 'material-ui/lib/paper';
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

ReactDOM.render((
  <div>
    <br/>
    <br/>
    <br/>
    
      <Router history={browserHistory}>
        <Route name="login" path="/" component={HomePage}/>
            <Route name="issue" path="/admin/issue" component={IssueForm}/>                                                         
            <Route name="returnbook" path="/admin/returnbook" component={ReturnBookForm}/>
            <Route name="add" path="/admin/add" component={AddBookForm}/>                                                              
            <Route name="register" path="/admin/register" component={RegisterBorrower}/>
            <Route name="search" path="/search" component={SearchBook}/>
      </Router>
    
  </div>
),
document.getElementById('leftPanel'));
ReactDOM.render((
  <div>
    
      <Router history={browserHistory}>
        <Route name="login" path="/" component={PanelLeft}/>
          <Route name="issue" path="/admin/issue" component={PanelLeft}/>                                                                                        
          <Route name="returnbook" path="/admin/returnbook" component={PanelLeft}/>
          <Route name="add" path="/admin/add" component={PanelLeft}/>                                                                                     
          <Route name="register" path="/admin/register" component={PanelLeft}/>
      </Router>
    
  </div>
),
document.getElementById('rightPanel'));
