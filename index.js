const express = require('express');
const exphbs = require('express-handlebars');
const firebase = require('firebase');

const app = express();
const activateControllers = require('./controllers/pageRoutes');
firebase.initializeApp(require('./firebaseConfig'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


activateControllers(app);


app.listen(5000, console.log('Listening on 5000'));