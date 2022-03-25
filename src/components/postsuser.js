/* eslint-disable import/no-cycle */
import {
  deletePost, getPost, savePost, updatePost, getPostCondition,
} from '../firestore.js';
import { getAuth } from '../firebase.js';
import { getUser } from '../user-firestore.js';
import { onNavigate } from '../routes/app.js';

export function listPostsUser(formHomeParam, btnPostParam) {
  const auth = getAuth;
  const formHome = formHomeParam;
  const btnPost = btnPostParam;

  const postContainer = document.createElement('div');

  let editStatus = false;
  let id = '';
  const uid = localStorage.getItem('userId');

  async function postUser(userId) {
    const querySnapshot = await getPostCondition(userId);

    querySnapshot.forEach(async (doc) => {
      const post = doc.data();
      const user = await getUser(post.userId);
      const name = user.data().userName;
      const lastName = user.data().userLastName;
      console.log(auth);

      const postContainerCard = document.createElement('section');
      postContainerCard.classList.add('post-container-card');

      // Contenedor del parrafo del nombre y apellido
      const pNameUser = document.createElement('p');
      pNameUser.innerHTML = `${name} ${lastName}`;

      // Contenedor del parrafo del post
      const pPost = document.createElement('p');
      pPost.innerHTML = post.message;

      // -- Contenedor de botones
      const postContainerButtons = document.createElement('div');
      postContainerButtons.classList.add('post-container-btn');

      // Boton de Likes
      const btnLikePost = document.createElement('button');
      btnLikePost.classList.add('btn-likes');
      btnLikePost.setAttribute('data-id', doc.id);
      const imgButton = document.createElement('img');
      imgButton.classList.add('icon-likes');
      imgButton.setAttribute('data-id', doc.id);
      imgButton.title = 'corazon sin rellenar';
      imgButton.src = 'https://svgshare.com/i/fEh.svg';
      btnLikePost.appendChild(imgButton);

      // espacio para el contador de los likes
      const containerLikes = document.createElement('div');
      containerLikes.classList.add('container-likes');
      const contLikes = document.createElement('span');
      contLikes.innerText = `${post.likes}`;
      containerLikes.appendChild(btnLikePost);
      containerLikes.appendChild(contLikes);

      // Boton de Borrar
      const btnDeletePost = document.createElement('button');
      btnDeletePost.classList.add('btn-delete');
      btnDeletePost.setAttribute('data-id', doc.id);
      btnDeletePost.innerHTML = '🗑 Delete';

      const btnEditPost = document.createElement('button');
      btnEditPost.classList.add('btn-edit');
      btnEditPost.setAttribute('data-id', doc.id);
      btnEditPost.innerHTML = '🖉 Edit';

      postContainerButtons.appendChild(containerLikes);
      postContainerButtons.appendChild(btnDeletePost);
      postContainerButtons.appendChild(btnEditPost);

      // Agregar container p y container button a Container general
      postContainerCard.appendChild(pNameUser);
      postContainerCard.appendChild(pPost);
      postContainerCard.appendChild(postContainerButtons);

      postContainer.appendChild(postContainerCard);
      // like a post
      // const btnsLikes = document.querySelectorAll('.btn-likes');
      // btnsLikes.forEach((btn) => {
      btnLikePost.addEventListener('click', async ({ target: { dataset } }) => {
        const uuid = localStorage.getItem('userId');
        const postId = dataset.id;
        const postData = await getPost(postId);
        let likes = postData.data().likes;
        const postLikes = postData.data().postLikes;
        const position = postLikes.indexOf(uuid);
        if (position !== -1) {
          postLikes.splice(position, 1);
          likes -= 1;
          onNavigate('/profile');
        } else {
          postLikes.push(uuid);
          likes += 1;
          onNavigate('/profile');
        }
        updatePost(postId, { likes, postLikes });
      });

      // Borrar un post
      // const btnsDelete = postContainer.querySelectorAll('.btn-delete');
      // btnsDelete.forEach((btn) => btn
      btnDeletePost.addEventListener('click', async ({ target: { dataset } }) => {
        try {
          if (window.confirm('Estas seguro de que quieres eliminar este post?')) {
            await deletePost(dataset.id);
            onNavigate('/profile');
          }
        } catch (error) {
          console.log(error);
        }
      });

      // Editamos el post
      // const btnsEdit = postContainer.querySelectorAll('.btn-edit');
      // btnsEdit.forEach((btn) => btn
      btnEditPost.addEventListener('click', async (e) => {
        try {
          await getPost(e.target.dataset.id);
          formHome['description-posts'].value = doc.data().message;

          editStatus = true;
          id = doc.id;
          btnPost.innerHTML = 'Guardar';
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  // Enviamos el post
  formHome.addEventListener('submit', async (e) => {
    e.preventDefault();
    const textArea = formHome['description-posts'];
    const userId = localStorage.getItem('userId');

    try {
      if (!editStatus) {
        await savePost(textArea.value, userId);
        onNavigate('/profile');
      } else {
        await updatePost(id, {
          message: textArea.value,
        });

        editStatus = false;
        id = '';
        btnPost.innerHTML = 'Publicar';
        onNavigate('/profile');
      }

      formHome.reset();
    } catch (error) {
      console.log(error);
    }
  });
  postUser(uid);
  return postContainer;
}