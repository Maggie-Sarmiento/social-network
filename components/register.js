/* eslint-disable import/no-cycle */
import { onNavigate } from '../routes/app.js';
import { updateUsers, registerUser } from '../auth.js';
import { createUser } from '../user-firestore.js';
import { popUpUser } from './popUser.js';

export function register() {
  const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
  const expPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  const sectionOverlay = document.createElement('section');
  sectionOverlay.classList.add('overlay');
  sectionOverlay.id = 'overlay';
  // contenedor del popup
  const divPopup = document.createElement('div');
  divPopup.classList.add('popup');
  // boton de cerrar el popup
  const btnClose = document.createElement('a');
  btnClose.text = 'X';
  btnClose.classList.add('btn-close-popup');
  btnClose.id = 'btnClosePopup';
  // titulo principal del popup
  const titleRegistration = document.createElement('h3');
  titleRegistration.innerText = 'Registrarte en Mapask';
  // titulo secundario del popup
  const titleSecondRegistration = document.createElement('p');
  titleSecondRegistration.innerText = 'es rápido y fácil';
  // formulario de registro
  const formRegistration = document.createElement('form');
  formRegistration.classList.add('form-registration');
  // input nombre
  const inputUserName = document.createElement('input');
  inputUserName.id = 'userName';
  inputUserName.classList.add('input');
  inputUserName.type = 'text';
  inputUserName.placeholder = 'Nombre: ';
  // input apellido
  const inputUserLastName = document.createElement('input');
  inputUserLastName.id = 'userLastName';
  inputUserLastName.classList.add('input');
  inputUserLastName.type = 'text';
  inputUserLastName.placeholder = 'Apellido: ';
  // input email de registro
  const inputEmail = document.createElement('input');
  inputEmail.id = 'inputEmailR';
  inputEmail.classList.add('input');
  inputEmail.type = 'email';
  inputEmail.placeholder = 'Correo: ';
  // input password de registro
  const inputPassword = document.createElement('input');
  inputPassword.id = 'inputPasswordR';
  inputPassword.classList.add('input');
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Contraseña: ';
  // input confirmacion de contraseña
  const inputPassConfirm = document.createElement('input');
  inputPassConfirm.id = 'inputPassConf';
  inputPassConfirm.classList.add('input');
  inputPassConfirm.type = 'password';
  inputPassConfirm.placeholder = 'Confirmar Contraseña: ';
  // container de mensaje de alerta para email
  const alertEmailR = document.createElement('div');
  alertEmailR.classList.add('container-email-r');
  alertEmailR.id = 'containerEmailR';
  // contenedor de fecha
  const containerDate = document.createElement('div');
  containerDate.classList.add('date-of-birth');
  // label de fecha
  const labelDate = document.createElement('label');
  labelDate.innerText = 'Fecha de Nacimiento: ';
  // input de fecha
  const inputDateRegister = document.createElement('input');
  inputDateRegister.id = 'dateOfBirth';
  inputDateRegister.type = 'date';
  // boton de registrarte
  const btnRegistration = document.createElement('button');
  btnRegistration.classList.add('button');
  btnRegistration.classList.add('btn-registration');
  btnRegistration.id = 'btnRegistration';
  btnRegistration.innerText = 'Registrate';

  containerDate.appendChild(labelDate);
  containerDate.appendChild(inputDateRegister);

  formRegistration.appendChild(inputUserName);
  formRegistration.appendChild(inputUserLastName);
  formRegistration.appendChild(inputEmail);
  formRegistration.appendChild(inputPassword);
  formRegistration.appendChild(inputPassConfirm);
  formRegistration.appendChild(alertEmailR);
  formRegistration.appendChild(containerDate);
  formRegistration.appendChild(btnRegistration);

  divPopup.appendChild(btnClose);
  divPopup.appendChild(titleRegistration);
  divPopup.appendChild(titleSecondRegistration);
  divPopup.appendChild(formRegistration);

  sectionOverlay.appendChild(divPopup);

  btnClose.addEventListener('click', () => {
    sectionOverlay.style.display = 'none';
  });

  btnRegistration.addEventListener('click', async (e) => {
    e.preventDefault();
    if (
      expEmail.test(inputEmail.value)
    && expPassword.test(inputPassword.value)
    && expPassword.test(inputPassConfirm.value)
    ) {
      if (inputPassword.value === inputPassConfirm.value) {
        const user = await registerUser(inputEmail.value, inputPassword.value);
        const userName = inputUserName.value;
        const userLastName = inputUserLastName.value;
        const date = inputDateRegister.value;
        const id = user.uid;
        onNavigate('/profile');
        sectionOverlay.appendChild(popUpUser());
        updateUsers(`${userName} ${userLastName}`);
        await createUser(id, {
          userName,
          userLastName,
          date,
        });
        localStorage.setItem('userId', id);
      } else {
        alertEmailR.innerHTML = '<span class="red"> Contraseñas no coinciden </span>';
      }
    } else {
      alertEmailR.innerHTML = '<span class="red"> Correo o contraseña inválido </span>';
    }
  });

  return sectionOverlay;
}
