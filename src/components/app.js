/* eslint import/no-cycle: [, { maxDepth: 1 }] */
import home from './home.js';
import login from './login.js';
import profile from './profile.js';

const routes = {
  '/home': home(),
  '/login': login(),
  '/profile': profile(),
};
const rootDiv = document.getElementById('root');

export function onNavigate(pathname) {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootDiv.innerHTML = null;
  rootDiv.appendChild(routes[pathname]);
}

window.onpopstate = () => {
  rootDiv.innerHTML = null;
  rootDiv.appendChild(routes[window.location.pathname]);
};

window.onload = onNavigate('/login');

rootDiv.innerHTML = null;
rootDiv.appendChild(routes[window.location.pathname]);
