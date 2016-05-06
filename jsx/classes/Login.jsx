import React from 'react';
const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SchemaService from './SchemaService.jsx'
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from './MyTheme.jsx';

var LoginForm = React.createClass({
  submitForm: function (model) {
  SchemaService.loginCall(model);
  console.log("Model: ", model);
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(MyRawTheme)};
  },
  render: function() {
    return (
      <div>
        <h1>Issue Form</h1>
        <Formsy.Form
          onValidSubmit={this.submitForm}>
        <FormsyText
           name="name"
           required
           floatingLabelText="User Name"
         />
       <br/>
         <FormsyText
            name="password"
            required
            type="password"
            floatingLabelText="Password"
          />
        <br/>
        <RaisedButton type="submit" label="Issue" secondary={true} />
        </Formsy.Form>
      </div>
    );
  }

});

module.exports = LoginForm;
