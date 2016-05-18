import React from'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import {orange500, blue500,grey900,grey50} from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import LazyLoad from 'react-lazy-load';


import NotesPage from "./NotesPage.jsx";

var Layout = React.createClass({
  getInitialState: function(props){
    return {
      user : "",
   
      
    }
  },
  
  loadData : function (){
    $.ajax({
      type:"GET",
      url:"/online",
      success:function(data){
        this.setState({user:data.username});
      
      }.bind(this)
    });
    
  },
  componentDidMount: function(){
  
       
    this.loadData();
    
  },

  render: function() {
    return (
     <div className="lazy">
        <div className="row">
       
    
      <NotesPage user={this.state.user}/>
     
      </div>
      
      </div>
 ); 
}
});

module.exports = Layout;
