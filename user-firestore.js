/* eslint import/no-unresolved: */
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from './firebase.js';

import initApp from './initApp.js';

initApp();
const db = getFirestore();

export async function createUser(id, data) {
  const docData = {
    ...data,
  };
  await setDoc(doc(db, 'users', id), docData);
}

export async function getUser(id) {
  return getDoc(doc(db, 'users', id));
}
export async function updateUser(id, newField) {
  return updateDoc(doc(db, 'users', id), newField);
}
