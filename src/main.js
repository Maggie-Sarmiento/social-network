// Este es el punto de entrada de tu aplicacion
import {
  loginGoogle, registerUser, loginUser, loginUserProfile, updateUsers,
} from './auth.js';
import { onNavigate } from './components/app.js';
import {
  savePost, onGetPosts, deletePost, getPost, updatePost,
} from './firestore.js';

import { createUser, getUser, updateUser } from './user-firestore.js';
/* import { listPosts } from './components/posts.js'; */

// import { myFunction } from './lib/index.js';

// Constante de validacion de correo y constraseña
const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
const expPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
const alertEmailPassword = document.querySelector('#containerPassword');
const alertEmailR = document.querySelector('#containerEmailR');
const alertGoogle = document.getElementById('alertGoogle');

// constantes de popup
const linkRegistration = document.getElementById('linkRegistration');
const cerrarPopup = document.querySelector('#btnCerrarPopup');
const overlay = document.querySelector('#overlay');
const inputEmail = document.querySelector('#inputEmailR');
const inputPassword = document.querySelector('#inputPasswordR');
const inputPassConfirm = document.querySelector('#inputPassConf');
const btnRegistration = document.querySelector('#btnRegistration');

// Sección de Listar post (Delete, Edit)
function listPosts() {
  const formHome = document.getElementById('formHome');
  const postContainer = document.getElementById('postContainer');
  const btnPost = document.getElementById('btnPost');

  let editStatus = false;
  let id = '';

  onGetPosts((querySnapshot) => {
    postContainer.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const post = doc.data();

      postContainer.innerHTML += `
      <div class="post-container-card">
        <p>${post.message}</p>
        <div class="post-container-btn"> 
          <button class="btn btn-primary btn-likes" data-id="${doc.id}">
            <img class="icon-likes" src='https://svgshare.com/i/fEh.svg' title='corazon sin rellenar' />
          </button>
          <button class="btn-primary btn-delete" data-id="${doc.id}">
            🗑 Borrar
          </button>
          <button class="btn-secondary btn-edit" data-id="${doc.id}">
            🖉 Editar
          </button>
        </div>
      </div>
      `;
    });

    // like a post
    //
    const btnsLikes = document.querySelectorAll('.btn-likes');
    btnsLikes.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        const postId = dataset.id;
        const postData = await getPost(postId);
        let likes = postData.data().likes;
        likes += 1;
        updatePost(postId, { likes });
      });
    });

    // Borramos un post
    const btnsDelete = postContainer.querySelectorAll('.btn-delete');
    btnsDelete.forEach((btn) => btn.addEventListener('click', async ({ target: { dataset } }) => {
      try {
        if (window.confirm('Estas seguro de que quieres eliminar este post?')) {
          await deletePost(dataset.id);
        }
      } catch (error) {
        console.log(error);
      }
    }));

    // Editamos el post
    const btnsEdit = postContainer.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => btn.addEventListener('click', async (e) => {
      try {
        const doc = await getPost(e.target.dataset.id);
        const post = doc.data();
        formHome['description-posts'].value = post.message;
        console.log(formHome['btn-post']);

        editStatus = true;
        id = doc.id;
        btnPost.innerHTML = 'Guardar';
        // formHome['btn-post'] = 'update';
      } catch (error) {
        console.log(error);
      }
    }));
  });

  // Enviamos el post
  formHome.addEventListener('submit', async (e) => {
    e.preventDefault();
    const textArea = formHome['description-posts'];
    const uid = localStorage.getItem('userId');

    try {
      if (!editStatus) {
        await savePost(textArea.value, uid);
      } else {
        await updatePost(id, {
          message: textArea.value,
        });

        editStatus = false;
        id = '';
        btnPost.innerHTML = 'Publicar';
        // formHome['btn-post'] = 'publicar';
      }

      formHome.reset();
    } catch (error) {
      console.log(error);
    }
  });
}

async function updateProfileUsers() {
  const containerProfileUsers = document.getElementById('containerProfileUsers');
  const formProfile = document.getElementById('formProfile');
  const uid = localStorage.getItem('userId');
  // const infoProfile = document.createElement('div');
  // infoProfile.classList.add('information-profile');

  if (uid) {
    const docUser = await getUser(uid);
    const userName = docUser.data().userName;
    const userLastName = docUser.data().userLastName;
    const dateOfBirth = docUser.data().date;

    containerProfileUsers.innerHTML = `
      <p>${userName} ${userLastName} </p>
      <p>${dateOfBirth}</p>
    `;

    formProfile.addEventListener('submit', async (e) => {
      e.preventDefault();

      const image = formProfile['photo-user'].value;
      const profession = formProfile['user-profession'].value;
      const hobbie = formProfile['user-hobbie'].value;
      const aboutMe = formProfile['user-about-me'].value;
      await updateUser(uid, {
        image,
        profession,
        hobbie,
        aboutMe,
      });
      containerProfileUsers.innerHTML += `
      <p>${profession}</p>
      <p>${hobbie}</p>
      <p>${aboutMe}</p>
      `;
      // containerProfileUsers.appendChild(infoProfile);
      formProfile.reset();
    });
  } else {
    console.log('User no Existe');
  }
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'profileBtn') {
    e.preventDefault();
    onNavigate('/profile');
    updateProfileUsers();
  } else if (e.target.id === 'home') {
    e.preventDefault();
    onNavigate('/home');
  }
});

if (document.querySelector('.login')) {
  // Seccion registrarse
  linkRegistration.addEventListener('click', () => {
    console.log('Me hiciste click');
    overlay.style.display = 'flex';
  });

  cerrarPopup.addEventListener('click', () => {
    overlay.style.display = 'none';
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
        const userName = document.getElementById('userName').value;
        const userLastName = document.getElementById('userLastName').value;
        const date = document.getElementById('dateOfBirth').value;
        console.log(user);
        const id = user.uid;
        console.log(id);
        onNavigate('/profile');
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
        onNavigate('/home');
        listPosts();
        const userId = (loginUserProfile()).uid;
        localStorage.setItem('userId', userId);
      }
    } else {
      alertEmailPassword.innerHTML = '<span class="red"> Correo o constraseña inválido </span>';
    }
  });

  // Seccion Boton de loguearse con google
  const btnLoginGoogle = document.getElementById('btnGoogle');
  btnLoginGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    const userGoogle = await loginGoogle();
    if (!userGoogle) {
      alertGoogle.innerHTML = '<span class="red"> Error al iniciar sesión </span>';
    } else {
      alertGoogle.innerHTML = '';
      onNavigate('/home');
      listPosts();
    }
  });
}
