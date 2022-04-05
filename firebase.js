/* eslint import/no-unresolved: */
export { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js';
export {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  deleteDoc,
  getDocs,
  onSnapshot,
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';

export {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js';

export {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js';
