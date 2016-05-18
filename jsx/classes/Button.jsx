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
import Popover from 'material-ui/lib/popover/popover';
import Menu from 'material-ui/lib/menu';
import MenuItem from 'material-ui/lib/menu/menu-item';
import {Router, Route, IndexRoute, Link} from 'react-router';

var Button = React.createClass({
  handleTouchTap : function(e){
    {this.props.handleTouchTap}
  },
  handleClick :function(e){
    {this.props.handleclick}
  },
 
  
  render: function() {
    
    return (
      <div >
              <div className="b2">
              <RaisedButton
                label="delete"
                onClick={this.props.handleClick}
                
              />
             
              <Link to ="edit"><RaisedButton
                label="Edit"
                
                onTouchTap={this.props.handleTouchTap}

              /></Link>
             
         </div>
              
   </div> 
 ); 
}
});

module.exports = Button;
