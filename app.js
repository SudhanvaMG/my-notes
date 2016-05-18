var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
expressRest = require('express-rest');
var app = express();
var rest = expressRest(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));
app.use(passport.initialize());
app.use(passport.session());


var mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0/library');

var users = mongoose.model('users', { 
    username: String, 
    password: String ,
    status: Boolean,
    notes : [{
        noteText : String,
        noteno : Number,
    }],
});
var edit = mongoose.model("edit",{ 
    text: String,
    user :String,
});





app.post('/', function(req, res) {
    users.find({username:req.body.username},function(err,data){
        if(err){
            console.log(error);
            
        }
        else if(req.body.password==data[0].password){
            
            users.update({username:data[0].username},{status:true},function(err){});
            res.redirect("/notes");
        }
    });
});



app.get("/notes",function(req,res){
    
    res.render("index");

});
app.post("/notes",function(req,res){
    users.update({status:true},{status:false},function(err){});
    res.redirect("/");

});
app.post("/remove",function(req,res){


   users.update({username:req.body.username},{$pull : { "notes" :{noteText : req.body.notes}}},function(err){
    if(err){
        console.log("error");
    }
    else{
        console.log("removed");
    }
   });
});
app.get("/online",function(req,res){

  
    users.find({status:true},function(err,data){
        
      res.send(data[0]);
    });
});

app.post("/newedit",function(req,res){
   users.update({"notes.noteText":req.body.oldtext},{$set : { "notes.$.noteText" : req.body.noteText}},function(err){
    if(err){
        console.log("error");
    }
    else{
        console.log("updated");

    }
   });

});


app.post("/notepost",function(req,res){
     console.log(req.body);
    users.find({username:req.body.username},function(err,data){
        if(err){
            console.log(error);
            
        }
        else {
            var oldtext =data[0].notes;
            var text = req.body.notes;
            
            var newtext = {
                noteText : req.body.notes,
                noteno : req.body.number,
            }
            var finaltext = oldtext.concat(newtext);
            users.update({username:data[0].username},{notes:finaltext},function(err){});
            
        }
    });
});

app.get("/image",function(req,res){
    res.sendFile("/home/sudhanva/Downloads/1.jpg");
});
app.post('/editpost', function(req, res) {
   edit.remove({},function(){});
     console.log("working");
   var edits = new edit();
   edits.text = req.body.text;
   edits.user = req.body.username;
   edits.save(function(err,data){
    if(err){
        console.log("error");
    }
    
   });

});
app.get("/editpost",function(req,res){
    edit.find({},function(err,data){
        res.send(data);
    });
});
app.get("/edit",function(req,res){
    res.render("index");
});

rest.post('/api/issuebook/', function(req, res) {
    var bid = req.body.bid;
    var accessionNumber = req.body.accessionNumber;
    function checkBookIssued (accessionNumber, id) {
        //Check book issued to this borrower or not
    }
    borrowers.findOne({ 'id' : bid }, function (err, borrower) {
        if (err) {
            console.log("Borrower not found.");
            res.badRequest();
        } else {
            books.findOne({ "accessionNumber": accessionNumber }, function (err, book) {
                if (err || book == null) {
                    console.log("Book not found.");
                    res.badRequest();
                } else {
                    var datetime = new Date();
                    borrower.booksIssued.push({ "accessionNumber" : accessionNumber, "issuedOn" : datetime });
                    borrower.save(function (err) {
                        if (err) {
                            console.log('Error occured while issuing book.'+err);
                            res.badRequest();
                        } else {
                            res.created();
                        }
                    });
                }
            });
        }
    });
});



rest.post('/api/returnbook/', function(req, res) {
    var bid = req.body.bid;
    var accessionNumber = req.body.accessionNumber;


    borrowers.findOne({ 'id' : bid }, function (err, borrower) {
        if (err) {
            console.log("Borrower not found.");
            res.badRequest();
        } else {
            books.findOne({ "accessionNumber": accessionNumber }, function (err, book) {
                if (err || book == null) {
                    console.log("Book not found.");
                    res.badRequest();
                } else {
                    borrower.booksIssued = null;
                    borrower.save(function (err) {
                        if (err) {
                            console.log('Error occured while returning book.'+err);
                            res.badRequest();
                        } else {
                            res.created();
                        }
                    });
                    var datetime = new Date();
                    book.history = { 'bid' : borrower.id, 'returnDate' : datetime };
                    book.save(function (err) {
                        if (err) {
                            console.log('Error occured while returning book.'+err);
                            res.badRequest();
                        } else {
                            res.created();
                        }
                    });
                }
            });
        }
    });
});

app.post("/api/search",function(req,res){
    search.remove(function(err,removed){
        if(err){
            console.log("error in deleting");
        }
    });
    var searchVal = new search();
    searchVal.value = req.body.value;
    searchVal.save(function(err,data){
        if(err){
            console.log("error in saving");
        }
        else{
            
            res.send(data.value);

        }
    });
});

app.get("/getallusers",function(req,res){

    users.find({},function(err,data){
        if(err){
            console.log("error is finding");
        }
        
        res.send(data);
    });
});


app.get('/api/getallbooks/', function(req, res) {

    books.find({}, function (err, book) {
        if (err || book == null) {
            res.badRequest()
        } else
           var bookvalue = [];
            book.forEach(function(data){
                bookvalue.push(data.name);
            });
        res.send(bookvalue);    
    });
});


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    users.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect("/"+req.user.privilege+"/"+req.user.username);
});


app.use('/', routes);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
