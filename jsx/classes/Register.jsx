 import React from 'react';
const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import SchemaService from './SchemaService.jsx'
import MenuItem from 'material-ui/lib/menus/menu-item';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from './MyTheme.jsx';
import SelectField from 'material-ui/lib/select-field';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Paper from 'material-ui/lib/paper';
import AutoComplete from 'material-ui/lib/auto-complete';

const style = {
  
  textAlign: 'center',
  display: 'inline-block',

};

var BorrowBookForm = React.createClass({
  getInitialState: function() {
    return {value: 1};
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  submitForm: function (model) {
    SchemaService.borrowerRegister(model);
    console.log("Model: ", model);
  },
  handleChange: function(event, index, value){this.setState({value: event.target.value});},
  render: function() {
    return (
      <div>
        <Paper style={style} zDepth={3} rounded={false} children={
          <card>
            <form onSubmit={this.submitForm}>
              <CardHeader title="RETURN  BOOK"/><br/>
                <CardText>
                  <TextField
                    hintText="Enter the Number:"
                    floatingLabelText = "AccessionNumber"
                    required
                  /><br/>
                  <TextField
                    hintText="Enter the ID:"
                    floatingLabelText = "Book ID"
                    required
                  /><br/><br/>
                </CardText>
                <SelectField value={this.state.value} onChange={this.handleChange}>
                  <MenuItem value={1} primaryText="Staff"/>
                  <MenuItem value={2} primaryText="Student"/>
                </SelectField><br/><br/>
                <RaisedButton
                  type="submit"
                  label="Register"
                  secondary={true} /><br/><br/>
            </form>
        </card>
      }/>
    </div>
    );
  }

});

module.exports = BorrowBookForm;
