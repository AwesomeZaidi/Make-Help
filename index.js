const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const user = require('./controllers/user');
const port = process.env.PORT || 5000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


user(app);


app.listen(port, console.log('Listening on 5000'));