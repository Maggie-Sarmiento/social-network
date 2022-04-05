/* eslint import/no-unresolved: */
import {
  getFirestore,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  getDoc,
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
} from './firebase.js';

import initApp from './initApp.js';

initApp();

// Iniciar Firestore
const db = getFirestore();

export const savePost = (message, userId, hashtags) => addDoc(collection(db, 'posts'), {
  message, userId, hashtags, likes: 0, postLikes: [],
});

export const onGetPosts = (callback) => onSnapshot(collection(db, 'posts'), callback);

export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

export const updatePost = (id, updatedPost) => updateDoc(doc(db, 'posts', id), updatedPost);

export const getPosts = () => getDocs(collection(db, 'posts'));

export async function getPost(id) {
  return getDoc(doc(db, 'posts', id));
}

export async function getPostCondition(userId) {
  const q = query(collection(db, 'posts'), where('userId', '==', userId));
  return getDocs(q);
}
