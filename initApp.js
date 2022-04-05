/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
/* eslint import/no-unresolved: */
import { initializeApp } from './firebase.js';

export default function initApp() {
  // Configuracion de Firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyA8XTGHVUY7SN25HMXh-uVAZRFzUGb45Uk',
    authDomain: 'mapask-fd02e.firebaseapp.com',
    projectId: 'mapask-fd02e',
    storageBucket: 'mapask-fd02e.appspot.com',
    messagingSenderId: '825279826600',
    appId: '1:825279826600:web:a86eb1b1abc8320c82509d',
  };

  // Inicialización de Firebase
  const app = initializeApp(firebaseConfig);
}
