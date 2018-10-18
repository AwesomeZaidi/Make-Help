const auth = require('./firebase').auth;

module.exports = (function() {
    function register(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function logInWithCredential(credential) {
        return auth.signInWithCredential(credential);
    }
    function logInWithEmailAndPassword(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    return {
        signUp: register,
        signInWithCredential: logInWithCredential,
        signInWithEmailAndPassword: logInWithEmailAndPassword
    }
})();