const User = require('../models/newUser');

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.render('signUp');
    });

    app.post('/users/', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        User.signUp(email, password)
        .then(userCredential => User.signInWithCredential(userCredential.credential))
        .then(user => res.render('dashboard', { email: user.email }))
        .catch(console.error);
    });
    app.post('/login/', (req, res) => {
        User.signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(userCredential => {
            res.render('dashboard', { email: userCredential.user.email });
        }).catch(console.error);
    });
    app.get('/login/', (req, res) => {
        res.render('login');
    });

}