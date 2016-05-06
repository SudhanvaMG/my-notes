import React from 'react';
const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SchemaService from './SchemaService.jsx'
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from './MyTheme.jsx';
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
import Snackbar from 'material-ui/lib/snackbar';

const style = {
  
  textAlign: 'center',
  display: 'inline-block',

};


var AddBookForm = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  getInitialState: function(){
    return {open: false};
  },
  handleRequestClose: function(){
    this.setState({
      open: false,
    });
  },
  handleTouchTap : function(){
    this.setState({
      open: true,
    });
  },
  componentDidMount: function () {
    var $name = $("#name");
   $("#add-button").on("click",function(){
    var order = {
      name : $name.val(),
    };
   
    $.ajax({
      type: "POST",
      url : "/api/getallbooks/",
      data : order,
      success: function(dataval){
        console.log("book added");
        }
    });
  });
  
  },
  render: function() {
    return (
      <div>
      <Paper style={style} zDepth={3} rounded={false} children={
        <card>
        <form  >
        <CardHeader title="ADD BOOK"/><br/>
        <CardText>
          <TextField
            hintText="Name"
            name ="name"
            id="name"
            floatingLabelText="Book Name"
            />
          <br/>
          <TextField
            hintText="AccessionNumber"
            
            floatingLabelText="Accession Number"
            />
          <br/>
          <TextField
            hintText="Category"
            
            floatingLabelText="Category"
            />
          <br/>
          <TextField
            hintText=" Enter the Author"
            
            floatingLabelText="Author"
            />
          <br/>
          <TextField
            hintText="Publication"
            
            floatingLabelText="Publication"
            />
          <br/>
          <TextField
            hintText="Edition"
            
            floatingLabelText="Edition"
            />
          <br/>
          </CardText>
          <RaisedButton
            onTouchTap={this.handleTouchTap}
            id="add-button"
            label="Add Book"
            secondary={true} /><br/><br/>
        </form>
        <Snackbar
          open={this.state.open}
          message="Book Added !"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        </card>
      }/>
      </div>
    );
  }

});

module.exports = AddBookForm;
