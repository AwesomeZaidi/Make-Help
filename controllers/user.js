const User = require('../models/user');

module.exports = function (app) {

    app.get('/', (req, res) => { res.render('home'); });
    app.get('/setup', (req, res) => { res.render('setup'); });

    // POST login from index
    app.post('/signIn/', (req, res) => {
        User.getUserIdWith(req.body.authToken)
        .then(uid => {
            console.log('Hello there. We are current;y trying to render the god damn dashboard. Thanks for your patients.');
            res.redirect(`/dashboard/`);
        }).catch(console.error);
    });

    app.get('/signup/', (req, res) => {
        res.render('signup');
    });
   
    // POST Sign Up to Setup
    app.post('/setup/', (req, res) => {
        user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }
        User.register(user)
        .then(newUser => {
            console.log("user.first_name:",user.first_name);
            res.render('setup', {first_name: user.first_name});      
        }).catch(console.error);
    });

    // POST set up data to Dashboard
    app.post('/dashboard/', (req, res) => {
        setupData = {
            picture: 'https://cdn.pixabay.com/photo/2015/05/03/14/40/woman-751236_960_720.jpg',
            strengths_list: req.body.strengths_list,
            weakness_list: req.body.weakness_list,
            users_swiped: []
        }
        User.setup(setupData);
        res.render('dashboard');
        // User.getWithId(req.params.uid).then(newSetupData => {
        //     res.render('dashboard', { user: newSetupData })
        // });
    });

    // GET Dashboard
    app.get('/dashboard/:uid', (req, res) => {
        User.getWithId(req.params.uid).then(userInfo => {
            res.render('dashboard', { user: userInfo });
        }).catch(console => {
            console.error(error);
        });
    });

    // GET Dashboard - asim
    app.get('/dashboard', (req, res) => {
        // User.dashboardPopulate
        res.render('dashboard');
    });
}