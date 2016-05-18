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

import Button from "./Button.jsx";
var vname = null;
var prior = "";
 var handleClick = function(i,datas){
     
     var nu = datas.noteText;
     console.log(nu);
    var removed = {
      username : vname,
      notes : nu,
    };
    $.ajax({
          type :"POST",
          url : "/remove",
          data : removed,
          success :function(dataval){}
      });
  };

var handleTouchTap = function(i,datas){
  var oldtext = datas.noteText ;

  var edit = {
    username : vname,
    text : oldtext,
  };
  $.ajax({
          type :"POST",
          url : "/editpost",
          data : edit,
          success :function(dataval){}
      });

};
var NotesPage = React.createClass({
   loadData : function (){
   
    $.ajax({
      type : "GET",
      url :"/online",
      success :function(data){
        this.setState({text:data.notes});
       var datas =  this.state.text;
      
     
      vname = data.username;
    
      }.bind(this)
    });

  },
  componentDidMount : function(){
      
    setInterval((function() {
        this.loadData();
    }).bind(this), 400);
  },
  getInitialState : function (props){
    return {
      text : [],
      open :false,
     
    }
  },

  render: function() {
    var createitem = function(datas,i){
    prior = "card"+ datas.noteno;
           
      return(
        
      
    <div className="col-sm-6" key={i} id="cards" >
    <div className="filler" />
    <LazyLoad height={400} offsetVertical={100}>  
          <Card >
          <div className = {prior} >
         
              <br/>
                <h2><CardTitle title={datas.noteText} />
                </h2>
              

              <CardText><br/><br/><br/>
                 
              </CardText><br/>
          <Button 
          handleClick={handleClick.bind(this,i,datas)} 
          handleTouchTap={handleTouchTap.bind(this,i,datas)} 
          key={i} 
         />
         </div>
          </Card>
           </LazyLoad>
          </div>
        
      );
    };
    return (
      <div>
        
        {this.state.text.map(createitem)}
        
   </div> 
 ); 
}
});

module.exports = NotesPage;
