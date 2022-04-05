export function popUpDelete() {
  const sectionOverlay = document.createElement('section');
  sectionOverlay.classList.add('overlay');
  sectionOverlay.id = 'overlay';
  sectionOverlay.style.display = 'none';

  // contenedor del popup
  const divPopup = document.createElement('div');
  divPopup.classList.add('popup-delete');

  // boton de cerrar el popup
  const btnClose = document.createElement('a');
  btnClose.text = 'X';
  btnClose.classList.add('btn-close-popup');
  btnClose.id = 'btnClosePopup';
  divPopup.appendChild(btnClose);

  // titulo principal del popup
  const titlePopDataUser = document.createElement('h4');
  titlePopDataUser.innerText = '¿Quieres eliminar este mensaje?';
  divPopup.appendChild(titlePopDataUser);

  // contenedor de los botones
  const containerBtns = document.createElement('div');
  containerBtns.id = 'containerbtnsPD';
  containerBtns.classList.add('containerbtnsPD');

  // boton de Aceptar
  const btnAcept = document.createElement('button');
  btnAcept.type = 'submit';
  btnAcept.id = 'btnAcept';
  btnAcept.classList.add('button');
  btnAcept.classList.add('btn-acept');
  btnAcept.innerText = 'Aceptar';
  containerBtns.appendChild(btnAcept);

  // boton de Cancelar
  const btnCancel = document.createElement('button');
  btnCancel.classList.add('button');
  btnCancel.classList.add('btn-cancel');
  btnCancel.id = 'btnCancel';
  btnCancel.innerText = 'Cancelar';
  containerBtns.appendChild(btnCancel);
  divPopup.appendChild(containerBtns);

  sectionOverlay.appendChild(divPopup);

  btnClose.addEventListener('click', () => {
    sectionOverlay.style.display = 'none';
  });
  return sectionOverlay;
}
