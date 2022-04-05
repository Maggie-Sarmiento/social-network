/* eslint import/no-cycle: [, { maxDepth: 1 }] */
import home from '../views/home.js';
import login from '../views/login.js';
import profile from '../views/profile.js';
import postHashtags from '../views/postHashtags.js';

const routes = {
  '/': login,
  '/home': home,
  '/profile': profile,
  '/hashtag': postHashtags,
};
const rootDiv = document.getElementById('root');

export function onNavigate(pathname) {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootDiv.innerHTML = null;
  rootDiv.appendChild(routes[pathname]());
}

window.onpopstate = () => {
  rootDiv.innerHTML = null;
  rootDiv.appendChild(routes[window.location.pathname]());
};
