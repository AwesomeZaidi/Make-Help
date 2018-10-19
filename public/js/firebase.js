var config = {
    apiKey: "AIzaSyCMqkRv0DUqJUJL4e6Ys_e5BKIyAnIETDA",
    authDomain: "makehelp-c9066.firebaseapp.com",
    databaseURL: "https://makehelp-c9066.firebaseio.com",
    projectId: "makehelp-c9066",
    storageBucket: "makehelp-c9066.appspot.com",
    messagingSenderId: "94213252981"
};
firebase.initializeApp(config);

function signIn() {
    console.log("SIGN IN FUNCTION IN IT TO WIN IT");
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(userCredential => {
        const uid = userCredential.user.uid;
        window.location.replace(`/dashboard/${uid}`);
        // firebase.auth().currentUser.getIdToken().then(idFuckinToken => {
        //     axios({
        //         url: 'http://localhost:5000/signIn/',
        //         method: 'POST',
        //         data: {
        //           authToken: idFuckinToken
        //         }
        //     });
        // })
    })
}


function previewFile() {
    
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
      preview.src = reader.result;
      return preview.src;
      firebase.database().collection("Users").doc("${uid}").get()
            .then()
    }, false);
  
    if (file) {
        let newimgurl = reader.readAsDataURL(file);
    }
  }