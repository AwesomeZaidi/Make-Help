const User = require('../models/user');

module.exports = function (app) {

    // GET HOME (INDEX)
    app.get('/', (req, res) => {
        res.render('home');
    });
    // POST login from index
    app.post('/', (req, res) => {
        User.signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(userCredential => {
            res.render('dashboard', { email: userCredential.user.email });
        }).catch(console.error);
    });

    // GET / Show Signup
    app.get('/signup/', (req, res) => {
        res.render('signup');
    });
    // POST USER then sign user in (broken) why /users/?
    app.post('/users/', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        User.signup(email, password)
        .then(userCredential => User.signInWithCredential(userCredential.credential))
        // unfortunately after sign up, sign in won't follow so we'll do  it the long way.
        .then(user => res.render('dashboard', { email: user.email }))
        .catch(console.error);
    });

}