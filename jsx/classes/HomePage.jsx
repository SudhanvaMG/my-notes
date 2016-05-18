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


var HomePage = React.createClass({
  
  render: function() {
    return (
    
      <div className="container4">
      <form method="POST">
        <Card >
          <div className="card">
            <div className="title">
            <br/>
              <CardTitle title="LOG IN " titleColor="white"  />
            <br/>
            </div>
            <CardText><br/><br/><br/>
              <TextField
                name = "username"
                hintText="Enter your name :"      
                floatingLabelText="User Name"
              /><br/><br/><br/>
              <TextField
                type = "password"
                name = "password"
                hintText="Enter your password :"    
                floatingLabelText="Password"
              /><br/><br/><br/><br/>
              <RaisedButton
                type="submit"
                className="button"
                label="SUBMIT"
              />
            </CardText><br/><br/>
          </div>
        </Card>
        </form>
      </div>
      
    );
  }

});

module.exports = HomePage;
