/* eslint import/no-cycle: [, { maxDepth: 1 }] */
import { onNavigate } from '../routes/app.js';
import { logOut } from '../auth.js';
// import profile from './profile.js';

export default function loadNavbar() {
  const navbar = document.createElement('navbar');
  navbar.classList.add('nav-bar');
  const navbarContainer = document.createElement('div');
  navbarContainer.classList.add('nav-bar-container');
  const icon = document.createElement('img');
  icon.src = 'https://svgshare.com/i/fkG.svg';
  icon.classList.add('icon');
  const iconMapask = document.createElement('ul');
  iconMapask.classList.add('icon-home');
  const listMapask = document.createElement('li');
  const mapask = document.createElement('a');
  mapask.dataset.path = '/home';
  mapask.id = 'home';
  const imgMapask = document.createElement('img');
  imgMapask.classList.add('mapask');
  imgMapask.src = 'https://svgshare.com/i/f6U.svg';
  imgMapask.title = 'Home';
  const titleHome = document.createElement('p');
  titleHome.innerHTML = 'Inicio';
  const listIcons = document.createElement('ul');
  listIcons.classList.add('icons-bar');
  const listLogOut = document.createElement('li');
  const logOutBtn = document.createElement('a');
  logOutBtn.id = 'logOut';
  logOutBtn.dataset.path = '/';
  const imgLogOut = document.createElement('img');
  imgLogOut.src = 'https://svgshare.com/i/fAy.svg';
  imgLogOut.title = 'LogOut';
  imgLogOut.classList.add('log-out');
  const titleLog = document.createElement('p');
  titleLog.innerHTML = 'Salir';
  const listHome = document.createElement('li');
  const home = document.createElement('a');
  home.dataset.path = '/home';
  home.id = 'home';
  const homeImg = document.createElement('img');
  homeImg.classList.add('home');
  homeImg.src = 'https://svgshare.com/i/fEX.svg';
  homeImg.title = 'Home';
  const listProfile = document.createElement('li');
  const profile = document.createElement('a');
  profile.dataset.path = '/profile';
  profile.id = 'profileBtn';
  const profileImg = document.createElement('img');
  profileImg.classList.add('img-profile');
  profileImg.src = 'https://svgshare.com/i/f5r.svg';
  const titleProfile = document.createElement('p');
  titleProfile.innerHTML = 'Perfil';

  profile.appendChild(profileImg);
  listProfile.appendChild(profile);
  listProfile.appendChild(titleProfile);
  home.appendChild(homeImg);
  listHome.appendChild(home);
  listHome.appendChild(titleHome);
  logOutBtn.appendChild(imgLogOut);
  listLogOut.appendChild(logOutBtn);
  listLogOut.appendChild(titleLog);
  listIcons.appendChild(listHome);
  listIcons.appendChild(listProfile);
  listIcons.appendChild(listLogOut);

  mapask.appendChild(imgMapask);
  listMapask.appendChild(mapask);
  iconMapask.appendChild(icon);
  iconMapask.appendChild(listMapask);

  navbarContainer.appendChild(iconMapask);
  navbarContainer.appendChild(listIcons);

  navbar.appendChild(navbarContainer);

  logOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logOut();
    onNavigate('/');
  });

  home.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/home');
  });

  profile.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/profile');
  });

  return navbar;
}
