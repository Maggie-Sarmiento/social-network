/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint import/no-unresolved: */
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from './firebase.js';
import { onNavigate } from './routes/app.js';
import initApp from './initApp.js';

// Iniciar Firebase
initApp();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const providerGit = new GithubAuthProvider();
auth.languageCode = 'es';

export async function loginGoogle() {
  let results;
  await signInWithPopup(auth, provider)
    .then((result) => {
      results = result;
    })
    .catch((error) => {
      const errorMsg = error.message;
      results = false;
    });
  return results;
}

export async function loginGithub() {
  let results;
  await signInWithPopup(auth, providerGit)
    .then((result) => {
      results = result;
    })
    .catch((error) => {
      const errorMsg = error.message;
      console.log(errorMsg);
      results = false;
    });
  return results;
}

export async function registerUser(email, password) {
  let user;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.message;
    });
  return user;
}

export async function updateUsers(name) {
  await updateProfile(auth.currentUser, {
    displayName: name,
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

export function loginUserProfile() {
  const user = auth.currentUser;
  let userValues;
  if (user !== null) {
    userValues = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      uid: user.uid,
    };
  }
  return userValues;
}

export async function logOut() {
  let resultLogOut;
  await signOut(auth)
    .then(() => {
      resultLogOut = true;
    })

    .catch(() => {
      resultLogOut = false;
    });
  return resultLogOut;
}

export const activeSession = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (window.location.origin) {
        onNavigate('/home');
      }
    } else {
      onNavigate('/');
    }
  });
};
