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



const style = {
  
  textAlign: 'center',
  display: 'inline-block',

};

var IssueForm = React.createClass({
  submitForm: function (model) {
  SchemaService.issueBook(model);
  console.log("Model: ", model);
  },
  
  render: function() {
    return (
      <div  >
       <Paper style={style} zDepth={3} rounded={false} children={
          <card >
                <form onSubmit={this.submitForm}>
                    <CardHeader title="ISSUE FORM"/><br/>
                      <CardText>
                         <TextField
                            hintText="Enter the Number:"
                            floatingLabelText = "AccessionNumber"
                            required
                          /><br/>
                           <TextField
                            hintText="Enter the ID:"
                            floatingLabelText = "Borrower ID"
                            required
                          /><br/><br/>
                      </CardText>
                    <RaisedButton type="submit" label="Issue" secondary={true} /><br/><br/>
                </form>
        </card>
      }/>
    </div>
    );
  }

});

module.exports = IssueForm;
