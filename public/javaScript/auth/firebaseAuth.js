function checkIfLoggedIn() {
  firebase.auth().onAuthStateChanged(user => {
    if (user && user.uid === "dTAogQa2xxXZ4B8fP91XXYHXknC2") { // REPLACE WITH .env.SECRET
      window.location.assign('/admin/panel');
    }
    else {
      signOut();
    }
  })
}
window.onload = () => checkIfLoggedIn();

function signOut() {
  firebase.auth().signOut();
  localStorage.removeItem('firebase_idToken');
  localStorage.removeItem('uid');
}

function signInWithGoogle() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider;
  firebase.auth().signInWithPopup(googleAuthProvider)
    .then(data => {
      if (data.user.uid !== "dTAogQa2xxXZ4B8fP91XXYHXknC2") { // env.SECRET
        window.location.replace('/');
      }
      else {
        let idToken = data.credential.idToken;
        localStorage.setItem('firebase_idToken', idToken);
        localStorage.setItem('uid', data.user.uid);
        checkIfLoggedIn();
      }
    })
    .catch(err => console.log(err))
}
