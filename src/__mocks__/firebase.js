/* eslint-disable no-unused-vars */
export const initializeApp = () => ({});
export const getFirestore = () => ({});
export const doc = () => ({});
const db = getFirestore();
const id = 'zysf456';
const users = {
  name: 'juan',
  lastName: 'Villegas',
};
export const getDoc = () => (doc(db, users, id));
export const setDoc = () => Promise.resolve({});
export const updateDoc = () => Promise.resolve({});

export const getAuth = () => Promise.resolve({});
export const createUserWithEmailAndPassword = (auth, email, password) => {
  const userCredential = {
    user: { uid: 'za123' },
  };
  return Promise.resolve(userCredential);
};

export class GoogleAuthProvider {}
export const signInWithPopup = () => Promise.resolve({});
export const signInWithEmailAndPassword = (auth, email, password) => {
  const userCredential = {
    user: { uid: 'za123' },
  };
  return Promise.resolve(userCredential);
};

export const updateProfile = () => Promise.resolve({});
export const onAuthStateChanged = () => Promise.resolve({});
export const signOut = () => Promise.resolve({});

export const deleteDoc = () => Promise.resolve({});
export const getDocs = () => Promise.resolve({});
export const onSnapshot = () => Promise.resolve({});
export const collection = () => Promise.resolve({});
export const addDoc = () => Promise.resolve({});
