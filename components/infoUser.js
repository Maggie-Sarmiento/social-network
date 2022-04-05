import { getUser } from '../user-firestore.js';

export function dataUser() {
  // div que contiene la info del aside
  const divAsideInfo = document.createElement('div');
  divAsideInfo.classList.add('userProfile');

  const img = document.createElement('img');
  img.src = 'https://i.postimg.cc/Zqr6SmNK/profile.png';
  img.classList.add('img-profile');
  divAsideInfo.appendChild(img);
  const name = document.createElement('h3');
  name.innerHTML = 'Mapaskito Vigask';

  img.addEventListener('click', async () => {
    const uid = localStorage.getItem('userId');
    const user = await getUser(uid);
    console.log(user.data());
  });
  return divAsideInfo;
}
