/* eslint-disable import/no-cycle */
import {
  loginUser, loginUserProfile, loginGoogle, loginGithub,
} from '../auth.js';
import { onNavigate } from '../routes/app.js';
import { register } from '../components/register.js';

export default function login() {
  const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
  const expPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  const sectionLogin = document.createElement('section');
  sectionLogin.classList.add('login');
  // parrafo de bienvenido
  const pWelcome = document.createElement('p');
  pWelcome.classList.add('welcome');
  pWelcome.innerText = 'Bienvenido';
  // titulo principal del proyecto
  const titleProject = document.createElement('h1');
  titleProject.innerText = 'Mapask';
  // parrafo del eslogan
  const pSlogan = document.createElement('p');
  pSlogan.innerText = 'Conecta con personas que se apasionan por la programación';
  // contenedor de imagen principal
  const containerImageLogin = document.createElement('picture');
  containerImageLogin.classList.add('image-login');
  const imageLogin = document.createElement('img');
  imageLogin.src = 'https://svgshare.com/i/fmB.svg';
  imageLogin.title = 'img-login';
  // contenedor de logueo
  const containerLogin = document.createElement('section');
  containerLogin.classList.add('container-login');
  // titulo secondario
  const titleProjectSecond = document.createElement('h2');
  titleProjectSecond.innerText = 'Mapask';
  // Formulario de logueo
  const formLogin = document.createElement('form');
  formLogin.classList.add('form-session');
  formLogin.onsubmit = 'return false';
  // input de email
  const formInputEmail = document.createElement('input');
  formInputEmail.classList.add('input');
  formInputEmail.classList.add('input-email');
  formInputEmail.id = 'inputEmail';
  formInputEmail.type = 'text';
  formInputEmail.placeholder = 'Email: ';
  formInputEmail.required = 'required';
  // contenedor para la alerta de email
  const containerAlertlEmail = document.createElement('div');
  containerAlertlEmail.classList.add('container-email');
  containerAlertlEmail.id = 'containerEmail';
  // input de password
  const formInputPassword = document.createElement('input');
  formInputPassword.classList.add('input');
  formInputPassword.classList.add('input-password');
  formInputPassword.id = 'inputPassword';
  formInputPassword.type = 'password';
  formInputPassword.placeholder = 'Contraseña: ';
  // contenedor para la alerta de password
  const containerAlertlPassword = document.createElement('div');
  containerAlertlPassword.classList.add('container-password');
  containerAlertlPassword.id = 'containerPassword';
  // boton de iniciar sesion
  const formButton = document.createElement('button');
  formButton.classList.add('button');
  formButton.classList.add('btn-login');
  formButton.id = 'btnLogin';
  formButton.type = 'password';
  formButton.innerText = 'Iniciar Sesion ';
  // contenedor de link de registro
  const divRegistration = document.createElement('div');
  divRegistration.classList.add('registration');
  const spanMessage = document.createElement('span');
  spanMessage.innerText = '¿No estas en Mapask?';
  const linkRegistration = document.createElement('a');
  linkRegistration.classList.add('link-registration');
  linkRegistration.id = 'linkRegistration';
  linkRegistration.innerText = 'Registrate';

  // contenerdor de botones auth
  const btnsAuthContainer = document.createElement('div');
  btnsAuthContainer.classList.add('btns-auth-container');
  // contenedor de boton de google
  const buttonGoogle = document.createElement('button');
  buttonGoogle.classList.add('btn-google');
  buttonGoogle.id = 'btnGoogle';
  // buttonGoogle.innerText = 'GOOGLE';
  const spanIconGoogle = document.createElement('img');
  spanIconGoogle.classList.add('iconGoogle');
  spanIconGoogle.src = 'https://svgshare.com/i/fnL.svg';

  // contenedor de boton de Github
  const buttonGit = document.createElement('button');
  buttonGit.classList.add('btn-google');
  buttonGit.id = 'btnGit';
  const spanIconGit = document.createElement('img');
  spanIconGit.classList.add('iconGit');
  spanIconGit.src = 'https://svgshare.com/i/fmC.svg';
  buttonGit.appendChild(spanIconGit);
  btnsAuthContainer.appendChild(buttonGoogle);
  btnsAuthContainer.appendChild(buttonGit);

  // Contenedor alerta de Google
  const alertGoogle = document.createElement('div');

  containerImageLogin.appendChild(imageLogin);

  formLogin.appendChild(formInputEmail);
  formLogin.appendChild(containerAlertlEmail);
  formLogin.appendChild(formInputPassword);
  formLogin.appendChild(containerAlertlPassword);
  formLogin.appendChild(formButton);

  divRegistration.appendChild(spanMessage);
  divRegistration.appendChild(linkRegistration);
  buttonGoogle.appendChild(spanIconGoogle);
  containerLogin.appendChild(titleProjectSecond);
  containerLogin.appendChild(formLogin);
  containerLogin.appendChild(divRegistration);

  containerLogin.appendChild(btnsAuthContainer);
  containerLogin.appendChild(alertGoogle);

  sectionLogin.appendChild(pWelcome);
  sectionLogin.appendChild(titleProject);
  sectionLogin.appendChild(pSlogan);
  sectionLogin.appendChild(containerImageLogin);
  sectionLogin.appendChild(containerLogin);

  formButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = formInputEmail.value;
    const password = formInputPassword.value;

    if (expEmail.test(email) && expPassword.test(password)) {
      const user = await loginUser(email, password);
      if (!user) {
        containerAlertlPassword.innerHTML = '<span class="red"> Usuario no registrado </span>';
      } else {
        containerAlertlPassword.innerHTML = '';
        onNavigate('/home');
        const userId = (loginUserProfile()).uid;
        localStorage.setItem('userId', userId);
      }
    } else {
      containerAlertlPassword.innerHTML = '<span class="red"> Correo o constraseña inválido </span>';
    }
  });

  buttonGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    const userGoogle = await loginGoogle();
    if (!userGoogle) {
      alertGoogle.innerHTML = '<span class="red"> Error al iniciar sesión </span>';
    } else {
      alertGoogle.innerHTML = '';
      onNavigate('/home');
    }
  });

  buttonGit.addEventListener('click', async (e) => {
    e.preventDefault();
    const userGit = await loginGithub();
    if (!userGit) {
      alertGoogle.innerHTML = '<span class="red"> Error al iniciar sesión </span>';
    } else {
      alertGoogle.innerHTML = '';
      onNavigate('/home');
      console.log('me logee');
    }
  });

  linkRegistration.addEventListener('click', () => {
    sectionLogin.appendChild(register());
  });

  return sectionLogin;
}
