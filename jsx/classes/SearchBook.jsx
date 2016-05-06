import React from 'react';

import {Router, Route, IndexRoute, Link} from 'react-router';
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from './MyTheme.jsx';
import Card from 'material-ui/lib/card/card';
import AutoComplete from 'material-ui/lib/auto-complete';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';


var SearchBook = React.createClass({
  getInitialState: function(props){
    return {bookName : "khnoirh"}
  },
  componentDidMount: function(){
    $.ajax({
      type:"GET",
      url:"/searchresult",
      success:function(data){
        console.log(data);
        this.setState({bookName:data});
      }.bind(this)
    });
  },
  render: function() {

    return (
      <div >
        <h2>{this.state.bookName}</h2>  
      </div>
    );
  }

});

module.exports = SearchBook;
