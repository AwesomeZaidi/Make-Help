const auth = require('./firebase').auth;

module.exports = (function() {
    function createUserWithEmailAndPassword(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    // function signInWithCredential(credential) {
    //     return auth.signInWithCredential(credential);
    // }
    function signInWithEmailAndPassword(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    return {
        createUserWithEmailAndPassword: createUserWithEmailAndPassword,
        // signInWithCredential: signInWithCredential,
        signInWithEmailAndPassword: signInWithEmailAndPassword
    }
})();
// Why do we use this () at the end again? It just tells the code to call the function?