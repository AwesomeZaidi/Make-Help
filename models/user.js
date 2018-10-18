const firebase = require('./firebase');

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/dashboard',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        provider = firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayNam = true
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback function. Terms of service url/callback.
    tosUrl: '/terms',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
        window.location.assign('By signing up you agree to our Terms and Conditions.');
    }
};
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

// auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
// });

// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });

// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // set html to display user...
//     }
//     else {
//         console.log("no user signed in");
        
//     }
// })
// FirebaseUI config.