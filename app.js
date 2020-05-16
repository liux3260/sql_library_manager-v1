const express = require('express');
const app = express();
//const Book = require('./models').Book;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const createError = require('createerror');
const logger = require('morgan');
const path = require('path');
const paginate = require('express-paginate');
//const router= express.Router();

const books = require('./routes/books');

app.use(paginate.middleware(10, 50));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
  
app.use('/static',express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','pug');

//app.use(app.router);
//books.initialize(app);
app.use('/', books);
//app.use('/books', books);


app.use( async (req, res, next) => {
    //const error = new Error("Page not Found");
    //error.status = 404;
    //console.log(res);
    //console.log(req);
    res.render("page-not-found");
    //res.render("page-not-found");

  });

app.use((err,req,res,next)=>{
    // set locals, only providing error in development
    console.log(err);
    console.log(err.status);

    //onsole.log(err.status);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
    res.status(err.status || 500);
    res.render('error');
    
    //res.status(err.status || 500);
    //res.render('error');
});

app.listen(3000, ()=>{
    console.log("The app is running on localhost:3000");
});