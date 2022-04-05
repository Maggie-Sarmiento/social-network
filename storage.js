/* eslint import/no-unresolved: */
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from './firebase.js';

import initApp from './initApp.js';

initApp();

const storage = getStorage();

export async function uploadImage(fullImage) {
  const image = fullImage.files[0];
  const archivoref = ref(storage, `ImageProfile/${image.name}`);
  await uploadBytes(archivoref, image);
}

export async function getImage(image) {
  const clearImagePath = image.replace(/C:\\fakepath\\/, '');
  const archivoref = ref(storage, `ImageProfile/${clearImagePath}`);
  return getDownloadURL(archivoref);
}
