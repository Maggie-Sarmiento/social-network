/* eslint-disable import/no-cycle */
// import { popUpDelete } from './popDelete.js';

import { onGetPosts } from '../firestore.js';
import { onNavigate } from '../routes/app.js';

const arrayPost = [];
let hashTags = [];

export default function loadHashtag() {
  const hashContainer = document.createElement('div');
  hashContainer.classList.add('hashContainer');
  const banner = document.createElement('div');
  banner.classList.add('bannerHash');
  banner.innerText = 'Lo más hablado esta semana';
  onGetPosts((doc) => {
    hashTags = [];

    doc.forEach((post) => {
      if (post.data().hashtags) {
        arrayPost.push(post.data());
      }
      arrayPost.forEach((dato) => {
        dato.hashtags.forEach((hash) => {
          if (!hashTags.includes(hash)) {
            hashTags.push(hash);
          }
        });
      });
    });

    const hashtagsContainer = document.createElement('div');
    hashtagsContainer.classList.add('hashcontainer');
    hashtagsContainer.appendChild(banner);
    hashContainer.innerHTML = null;

    hashTags.forEach((tag) => {
      const hashtags = document.createElement('a');
      hashtags.classList.add('hashText');
      hashtags.innerText = tag;
      hashtagsContainer.appendChild(hashtags);
    });
    hashContainer.appendChild(hashtagsContainer);
  });
  hashContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('hashText')) {
      e.preventDefault();
      sessionStorage.setItem('hash', e.target.textContent);
      onNavigate('/hashtag');
    }
  });
  return hashContainer;
}
