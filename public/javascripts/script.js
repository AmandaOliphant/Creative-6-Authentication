initApp = function() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            user.getIdToken().then(function(accessToken) {
                document.getElementById('welcome-status').textContent = user.displayName;
                document.getElementById('user-image').src = user.photoURL;
                document.getElementById('sign-in-out-btn').textContent = 'Sign Out';
                // document.getElementById('account-details').textContent = JSON.stringify({
                //     displayName: displayName,
                //     email: email,
                //     emailVerified: emailVerified,
                //     phoneNumber: phoneNumber,
                //     photoURL: photoURL,
                //     uid: uid,
                //     accessToken: accessToken,
                //     providerData: providerData
                // }, null, '  ');
                document.getElementById('sign-in-out-btn').addEventListener('click', function(event) {
                    firebase.auth().signOut();
                })
            });
        }
        else {
            // User is signed out.
            document.getElementById('sign-in-out-btn').textContent = 'Sign In';
            document.getElementById('sign-in-out-btn').addEventListener('click', function(event) {
                firebase.auth().signOut();
                window.location = 'index.html';
            })
        }
    }, function(error) {
        console.log(error);
    });

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
};

window.addEventListener('load', function() {
    initApp()
});
