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
import {Router, Route, IndexRoute, Link} from 'react-router';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';

import NotesPage from "./NotesPage.jsx";
const styles = {
  customWidth: {
    width: 150,
  },
};
var DashboardPage = React.createClass({
  getInitialState: function(props){
    return {
      user : "",
      value : 1,
      data :null,
      noteNO : 0,
      
    }
  },
  
  loadData : function (){
    $.ajax({
      type:"GET",
      url:"/online",
      success:function(data){
        this.setState({user:data.username});
        var nu = data.notes.length;
        this.setState({noteNO:nu});
      }.bind(this)
    });
    
  },
  componentDidMount: function(){
    $(function(){
      $("#body").attr("style","background-image: url('https://wallpaperscraft.com/image/apple_brand_imac_desk_keyboard_79998_2560x1440.jpg')");

      
    });
    this.loadData();
    
  },
  handleClick : function(){
    var $text = $("#text"); 

    var prior = this.state.value; 
    if(prior==1){
      window.alert("select priority");
    }  
    else {
    
      prior = prior-1;
      var status = {
          number : prior,
          notes : $text.val(),
          username : this.state.user,
      } ;
      $.ajax({
          type :"POST",
          url : "/notepost",
          data : status,
          success :function(dataval){}
      });
    document.getElementById('text').value='';
      }
  },
  handleChange :function(event, index, value) {
    this.setState({value});
  },
  render: function() {
    return (
      <div >
        <div  className="card">
          <Card >
            
              
              <br/>
               <CardMedia overlay={<CardTitle title="WELCOME"  />}>
    
    <div className="image">
    
     
   
     </div>
    </CardMedia>
                <br/>
                <h1>{this.state.user}</h1>
                
                <div id="add">
          
         <div className ="del">
                <form method="POST">
                <RaisedButton
                type="submit"
                label="Logout"
                 
                id="del-button"
              />

              </form>
              </div>
            
                <TextField
                name = "add"
                hintText="add the text:"    
                maxLength="50"
                id="text"
                rows = {3}
                rowsmax ={4}
                multiLine={true}
              />
              
              <RaisedButton
                label="add"
                onClick={this.handleClick}
                id="add-button"
              /><br/>
              <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="priority" />
          <MenuItem value={2} primaryText="1" />
          <MenuItem value={3} primaryText="2" />
          <MenuItem value={4} primaryText="3" />
          
        </SelectField>
              
        </div>
                <CardText><br/><br/><br/>
              
                <br/><br/><br/>
              </CardText>
            
          </Card>
          </div>
        
          {this.props.children}
      
    </div>
    
 ); 
}
});

module.exports = DashboardPage;
