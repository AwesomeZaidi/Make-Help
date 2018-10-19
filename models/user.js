const auth = require('./firebase').auth;
const db = require('./firebase').db;
const admin = require('firebase-admin');
const firebaseConfig = require('../models/firebase')
let FirebaseAuthNode = require('firebase-auth-node');
let serviceKey = require("../models/servicekey.json"); // Fetch the service account key JSON file contents
let firebaseAuth = new FirebaseAuthNode(firebaseConfig, serviceKey);

admin.initializeApp({
    credential: admin.credential.cert(serviceKey),
    databaseURL: "https://makehelp-c9066.firebaseio.com"
});

module.exports = (function() {
    // # register func code
        // const usersCollection = firestore.collection("Users");
        // User Sign Up / Create User Document in Users Collection in DB
        // Save users email, password(deleted from db), display name(first, last)
    function register(newUser) {
        return auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(userCredential => {
            return userCredential.user.updateProfile({
                displayName: `${newUser.first_name} ${newUser.last_name}`,
            })
            .then(() => db.collection('Users').doc(userCredential.user.uid).set(newUser))
            .then(() => auth.signInWithEmailAndPassword(newUser.email, newUser.password));
        });
    }
    // User Sign In
    function signInWithEmailAndPassword(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
 
    function setup(newSetupData) {
        db.collection('Users').doc(auth.currentUser.uid).update(newSetupData);
    }
    function getUidWith(authToken) {
        return firebaseAuth.authToken(authToken).then(decodedIdToken => {
            console.log(decodedIdToken.uid);
            return decodedIdToken.uid;
        });
    }

    function getUserWith(uid) {
        return new Promise((resolve, reject) => {
            db.collection('Users').doc(uid).get().then(snap => {
                resolve(snap);
            }).catch(error => {
                reject(error);
            });
        });
        // Firestore data user passes in to their User object.

    }

    return {
        register: register,
        signInWithEmailAndPassword: signInWithEmailAndPassword,
        setup: setup,
        getUserIdWith: getUidWith,
        getWithId: getUserWith
    }
})();
// Why do we use this () at the end again? It just tells the code to call the function?

// some old code
// save user to the database - how do we do dat?
// root of db: Users
// // const user = usersCollection.doc("  ")
// usersCollection.doc(uid).set({
//     email: email,
//     password: password
// }).then(function() {
//     console.log("User Saved Successfully!");
// }).catch(function (error) {
//     console.log("Error saving the user.");
// });