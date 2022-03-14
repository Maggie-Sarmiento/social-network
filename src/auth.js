/* eslint-disable no-unused-vars */
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  //   signOut,
  /* eslint import/no-unresolved: */
} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js';

import initApp from './initApp.js';

// Iniciar Firebase
initApp();
const auth = getAuth();
const provider = new GoogleAuthProvider();
auth.languageCode = 'es';

export async function loginGoogle() {
  let results;
  await signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      results = result;
    })
    .catch((error) => {
      const errorMsg = error.message;
      results = false;
    });
  return results;
}

export async function registerUser(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.message;
    });
}

export async function loginUser(email, password) {
  let user;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.message;
      user = null;
    });
  return user;
}
