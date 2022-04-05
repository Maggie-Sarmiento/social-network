/* eslint-disable import/no-cycle */
import { onNavigate } from '../routes/app.js';
import { updateUser } from '../user-firestore.js';
import { uploadImage } from '../storage.js';

export function popUpUser() {
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
  divPopup.appendChild(btnClose);

  // titulo principal del popup
  const titlePopDataUser = document.createElement('h3');
  titlePopDataUser.classList.add('title-data-user');
  titlePopDataUser.innerText = 'Actualiza tus datos';
  divPopup.appendChild(titlePopDataUser);

  // Datos a actualizar
  /* const overlayProfile = document.createElement('section');
  overlayProfile.classList.add('overlayProfile');
  const divProfile = document.createElement('div');
  divProfile.classList.add('contenedor-profile'); */

  // formulario de los datos personales del usuario
  const formProfile = document.createElement('form');
  formProfile.id = 'formProfile';
  formProfile.classList.add('form-Profile');

  // input imagen
  const inputImage = document.createElement('input');
  inputImage.type = 'file';
  inputImage.id = 'photo-user';
  inputImage.classList.add('photo-user');
  inputImage.name = 'photo-user';
  inputImage.required = 'required';
  formProfile.appendChild(inputImage);

  // input profesion
  const inputProfession = document.createElement('input');
  inputProfession.type = 'text';
  inputProfession.id = 'userProfession';
  inputProfession.name = 'user-profession';
  inputProfession.classList.add('input');
  inputProfession.required = 'required';
  inputProfession.placeholder = 'Profesion: ';
  formProfile.appendChild(inputProfession);

  // input hobbie
  const inputHobbie = document.createElement('input');
  inputHobbie.type = 'text';
  inputHobbie.id = 'userHobbie';
  inputHobbie.name = 'user-hobbie';
  inputHobbie.classList.add('input');
  inputHobbie.required = 'required';
  inputHobbie.placeholder = 'Me gusta: ';
  formProfile.appendChild(inputHobbie);

  // Input About me
  const inputAboutMe = document.createElement('input'); inputImage.type = 'file';
  inputAboutMe.id = 'userAboutMe';
  inputAboutMe.type = 'text';
  inputAboutMe.name = 'user-about-me';
  inputAboutMe.classList.add('input');
  inputAboutMe.required = 'required';
  inputAboutMe.placeholder = 'Sobre mi: ';
  formProfile.appendChild(inputAboutMe);

  // boton guardar datos de usuario
  const btnSaveInfo = document.createElement('button');
  btnSaveInfo.type = 'submit';
  btnSaveInfo.id = 'btnUpdateDats';
  btnSaveInfo.classList.add('button');
  btnSaveInfo.classList.add('btn-updateDats');
  btnSaveInfo.innerText = 'Guardar datos';
  formProfile.appendChild(btnSaveInfo);

  const uid = localStorage.getItem('userId');
  // btnUpdate.addEventListener('click', async () => {
  //   const docUser = await saveDataUser(uid);
  // });
  async function loadProfile(userId) {
    if (userId) {
      // const docUser = await getUser(userId);

      formProfile.addEventListener('submit', async (e) => {
        e.preventDefault();

        const image = inputImage.value;
        await uploadImage(inputImage);
        const profession = inputProfession.value;
        const hobbie = inputHobbie.value;
        const aboutMe = inputAboutMe.value;
        await updateUser(userId, {
          image,
          profession,
          hobbie,
          aboutMe,
        });

        formProfile.reset();
        onNavigate('/profile');
      });
    }// else {

    // }
  } loadProfile(uid);

  btnClose.addEventListener('click', () => {
    sectionOverlay.style.display = 'none';
  });

  divPopup.appendChild(formProfile);
  sectionOverlay.appendChild(divPopup);

  return sectionOverlay;
}
