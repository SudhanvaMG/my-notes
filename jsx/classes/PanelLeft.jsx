import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import {Router, Route, IndexRoute, Link} from 'react-router';
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from './MyTheme.jsx';
import Card from 'material-ui/lib/card/card';
import FlatButton from 'material-ui/lib/flat-button';
import AutoComplete from 'material-ui/lib/auto-complete';
import RaisedButton from 'material-ui/lib/raised-button';



var Sidebar = React.createClass({
  getInitialState(props) {
    return {open: false};
  },
  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  },
  handleChange(data, event) {
    if (event === 'clickaway' || event === 'escape')
    this.setState({open: false});
  }
  ,
  render() {
    return (
      <div>
        <LeftNav
          open={this.state.open}
          docked={false}
          onRequestChange={this.handleChange}>
          <AppBar
            title="Menu"/>
          <Link to="/admin/issue" onTouchTap={this.handleToggle}>
            <MenuItem>
              Issue Form
            </MenuItem>
          </Link>
          <br/>
          <Link to="/admin/returnbook">
            <MenuItem onTouchTap={this.handleToggle}>
              Return Book
            </MenuItem>
          </Link>
          <br/>
          <Link to="/admin/add">
            <MenuItem onTouchTap={this.handleToggle}>
              Add Book
            </MenuItem>
          </Link>
          <br/>
          <Link to="/admin/register">
          <MenuItem onTouchTap={this.handleToggle}>
              Register User
          </MenuItem>
          </Link>
          <br/>
        </LeftNav>
      </div>
    );
  }
});




const Layout = React.createClass({
  getInitialState(props) {
    return { books : []};
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  componentDidMount(){
    $.ajax({
      type:"GET",
      url:"/api/getallbooks/",
      success: function(data){
        this.setState({books : data});
        }.bind(this)
    });
    var $searchVal = $("#search");
   $("#submit-button").on("click",function(){
    var data = {
      value : $searchVal.val(),
    };
    $.ajax({
      type: "POST",
      url : "/api/search/",
      data : data,
      success: function(dataval){
        console.log(dataval);
        }
    });
  });
  },
  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  _handleClick(e) {
    e.preventDefault();
    this.refs.sidebar.handleToggle();
  },
  render() {
    return <div className="page">
      <AppBar
        title="Library System - Department Of Information Science "
        onLeftIconButtonTouchTap={this._handleClick}
        iconElementRight={
          <div>
          
          <AutoComplete
          floatingLabelText="Search a book you want"
          filter={AutoComplete.caseInsensitiveFilter}
          triggerUpdateOnFocus={true}
          dataSource={this.state.books}
          id="search"
          />
           <Link to="search">
          <FlatButton
           label="Search"
            default={true}
            type="submit" 
            id="submit-button"
            />
          </Link>
          </div>
        }
        />
        
      <div className="main-container">
      
        {this.props.children}
      
      </div>

      <Sidebar ref="sidebar"/>
    </div>;
  }
});

export default Layout;
