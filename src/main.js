// Este es el punto de entrada de tu aplicacion
import { loginGoogle, registerUser, loginUser } from './auth.js';

// import { myFunction } from './lib/index.js';

// Constante de validacion de correo y constraseña
const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
const expPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
const alertEmailPassword = document.querySelector('#containerPassword');
const alertEmailR = document.querySelector('#containerEmailR');

// constantes de popup
const linkRegistration = document.querySelector('#linkRegistration');
const cerrarPopup = document.querySelector('#btnCerrarPopup');
const overlay = document.querySelector('#overlay');
const inputEmail = document.querySelector('#inputEmailR');
const inputPassword = document.querySelector('#inputPasswordR');
const inputPassConfirm = document.querySelector('#inputPassConf');
const btnRegistration = document.querySelector('#btnRegistration');

if (document.querySelector('.login')) {
  overlay.style.visibility = 'hidden';

  // Seccion registrarse
  linkRegistration.addEventListener('click', () => {
    overlay.style.visibility = 'visible';
  });

  cerrarPopup.addEventListener('click', () => {
    overlay.style.visibility = 'hidden';
  });

  btnRegistration.addEventListener('click', (e) => {
    e.preventDefault();
    if (
      expEmail.test(inputEmail.value) && 
      expPassword.test(inputPassword.value) && expPassword.test(inputPassConfirm.value)
    ) {
      if (inputPassword.value === inputPassConfirm.value) {
        registerUser(inputEmail.value, inputPassword.value);
        window.location.href = '';
      } else {
        alertEmailR.innerHTML = '<span class="red"> Contraseñas no coinciden </span>';
      }
    } else {
      alertEmailR.innerHTML = '<span class="red"> Correo o contraseña inválido </span>';
    }
  });

  // Seccion Iniciar sesion
  document.querySelector('#btnLogin').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#inputEmail').value;
    const password = document.querySelector('#inputPassword').value;

    if (expEmail.test(email) && expPassword.test(password)) {
      const user = await loginUser(email, password);
      if (!user) {
        alertEmailPassword.innerHTML = '<span class="red"> Usuario no registrado </span>';
      } else {
        alertEmailPassword.innerHTML = '';
        window.location.href = '#/home';
      }
    } else {
      alertEmailPassword.innerHTML = '<span class="red"> Correo o constraseña inválido </span>';
    }
  });

  // Seccion Boton de loguearse con google
  const btnLoginGoogle = document.getElementById('btnGoogle');
  btnLoginGoogle.addEventListener('click', loginGoogle);
} else {
  // document.querySelector('.login').innerHTML = '';
}
