const express = require("express");
const app = express();
const path = require('path') // research the path native node module
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const port = process.env.PORT || 3000
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: require("handlebars-helpers")(),
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
require('./data/site-db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(expressValidator());

// routers
const indexRouter = require('./controllers/index');
app.use(indexRouter);
const authRouter = require('./controllers/auth');
app.use(authRouter);

app.listen(port, () =>{
    console.log(`Server is listening on ${port}`);
});
module.exports = { app }
 
