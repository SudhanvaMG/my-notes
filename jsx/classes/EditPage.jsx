import React from 'react';
const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Paper from 'material-ui/lib/paper';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {Router, Route, IndexRoute, Link} from 'react-router';

var no = "";
var unam = "";

var EditPage = React.createClass({
   getInitialState: function(props){
    return {
     value : "",
     
    }
  },

  loadData : function (){
        
     $.ajax({
      type:"GET",
      url:"/editpost",
      success:function(data){
        no =data[0].text;
        unam = data[0].user;
        console.log(unam);
        this.setState({value:no});
       
      }.bind(this)
    });
   
    
  },
  handleChange :function(event){
    this.setState({
      value: event.target.value,
    });
  },
  handleClick :function(e){
    $(function(){
      
          var $text = $("#text-field-controlled");
          var order ={
            oldtext : no,
            user : unam,
            noteText : $text.val(),
          };
          $.ajax({
          type: "POST",
          url : "/newedit",
          data : order,
          success: function(dataval){}
    });
    

    });
  },
   componentDidMount: function(){

    this.loadData();
  },
   render: function() {
   
  
    return (
      <div  >
      
        <TextField
                
               value={this.state.value}
              onChange={this.handleChange}
               id="text-field-controlled"
                rows = {3}
                rowsmax ={4}
                multiLine={true}
              /><br/>
               <Link to ="/notes">
               <RaisedButton
                label="Save"
                onClick={this.handleClick}
                id="button"
              />
              </Link>
      </div>
    );
  }

});

module.exports = EditPage;
