/* eslint-disable max-classes-per-file */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export const initializeApp = () => ({});

export const getFirestore = () => ({});
export const deleteDoc = () => Promise.resolve({});
export const getDocs = () => Promise.resolve({});
export const onSnapshot = () => Promise.resolve({});
export const collection = () => Promise.resolve({});
export const addDoc = () => Promise.resolve({});

export const doc = () => ({});
const db = getFirestore();
const users = {
  name: 'Juan',
  lastName: 'Villegas',
};
const id = 'zysf456';

export const getDoc = () => (doc(db, users, id));

export const setDoc = () => Promise.resolve({});
export const updateDoc = () => Promise.resolve({});

export const getAuth = () => ({});
export const createUserWithEmailAndPassword = (auth, email, password) => {
  const userCredential = {
    user: { uid: 'za123' },
  };
  return Promise.resolve(userCredential);
};

export class GoogleAuthProvider {}
export const signInWithPopup = (getAuth, GoogleAuthProvider) => {
  const result = { uid: 'za123' };
  return Promise.resolve(result);
};

export class GithubAuthProvider {}

export const signInWithEmailAndPassword = (auth, email, password) => {
  const userCredential = {
    user: { uid: 'za123' },
  };
  return Promise.resolve(userCredential);
};

export const onAuthStateChanged = () => Promise.resolve({});
export const signOut = (getAuth) => {
  const userEmail = {
    email: 'gsmaggie001@gmail.com',
  };
  return Promise.resolve(userEmail);
};
export const updateProfile = () => Promise.resolve({});

export const getStorage = () => ({});
export const ref = () => ({});
export const uploadBytes = () => Promise.resolve({});
export const getDownloadURL = () => Promise.resolve({});
