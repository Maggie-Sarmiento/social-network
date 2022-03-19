/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
/* eslint import/no-unresolved: */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function initApp() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyA8XTGHVUY7SN25HMXh-uVAZRFzUGb45Uk',
    authDomain: 'mapask-fd02e.firebaseapp.com',
    projectId: 'mapask-fd02e',
    storageBucket: 'mapask-fd02e.appspot.com',
    messagingSenderId: '825279826600',
    appId: '1:825279826600:web:a86eb1b1abc8320c82509d',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
}
