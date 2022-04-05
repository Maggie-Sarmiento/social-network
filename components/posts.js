/* eslint-disable import/no-cycle */
/* eslint-disable implicit-arrow-linebreak */
import {
  onGetPosts,
  deletePost,
  getPost,
  savePost,
  updatePost,
} from '../firestore.js';
import { onNavigate } from '../routes/app.js';
import { getImage } from '../storage.js';

import { getUser } from '../user-firestore.js';

export function listPosts(formHomeParam, btnPostParam) {
  const formHome = formHomeParam;
  const btnPost = btnPostParam;

  const postContainer = document.createElement('div');
  let editStatus = false;
  let id = '';
  let hashtagsArray = [];
  /* user = getUser();
  let nameUser; */
  onGetPosts((querySnapshot) => {
    postContainer.innerHTML = '';
    // let data = {};
    querySnapshot.forEach(async (doc) => {
      const post = doc.data();
      const user = await getUser(post.userId);
      const name = user.data().userName;
      console.log(name);
      const lastName = user.data().userLastName;
      const image = user.data().image;

      const postContainerCard = document.createElement('section');
      postContainerCard.classList.add('post-container-card');

      // contenedor de la imagen
      const divImage = document.createElement('div');
      divImage.classList.add('div-image');

      let showImagePost;
      await getImage(image).then((url) => {
        showImagePost = document.createElement('img');
        showImagePost.classList.add('show-image-post');
        showImagePost.src = url;
      });

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
      // imgButton.src = 'https://svgshare.com/i/fEh.svg';
      imgButton.src = 'https://svgshare.com/i/fhR.svg';
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

      divImage.appendChild(showImagePost);
      divImage.appendChild(pNameUser);

      // Agregar container p y container button a Container general
      postContainerCard.appendChild(divImage);
      postContainerCard.appendChild(pPost);
      postContainerCard.appendChild(postContainerButtons);

      postContainer.appendChild(postContainerCard);
      // like a post
      // const btnsLikes = document.querySelectorAll('.btn-likes');
      // btnsLikes.forEach((btn) => {btn.
      btnLikePost.addEventListener('click', async ({ target: { dataset } }) => {
        const uid = localStorage.getItem('userId');
        const postId = dataset.id;
        const postData = await getPost(postId);
        let likes = postData.data().likes;
        const postLikes = postData.data().postLikes;
        const position = postLikes.indexOf(uid);
        if (position !== -1) {
          postLikes.splice(position, 1);
          imgButton.classList.remove('icon-likes');
          imgButton.classList.add('icon-likes-less');
          imgButton.title = 'corazon relleno';
          imgButton.src = 'https://svgshare.com/i/fEh.svg';
          likes -= 1;
        } else {
          postLikes.push(uid);
          imgButton.classList.remove('icon-likes');
          imgButton.classList.add('icon-likes-full');
          imgButton.title = 'corazon relleno';
          imgButton.src = 'https://svgshare.com/i/fhR.svg';
          likes += 1;
        }
        updatePost(postId, { likes, postLikes });
      });

      // Borrar un post

      btnDeletePost.addEventListener('click', async ({ target: { dataset } }) => {
        try {
          const sectionOver = document.querySelector('#overlay');
          sectionOver.style.display = 'flex';
          const btnAcept = document.querySelector('#btnAcept');
          const btnCancel = document.querySelector('#btnCancel');
          btnAcept.addEventListener('click', async () => {
            await deletePost(dataset.id);
            sectionOver.style.display = 'none';
          });
          btnCancel.addEventListener('click', () => {
            onNavigate('/home');
          });
        } catch (error) {
          console.log(error);
        }
      });

      // Editamos el post
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
  });

  // Enviamos el post
  formHome.addEventListener('submit', async (e) => {
    e.preventDefault();
    const textArea = formHome['description-posts'];
    const uid = localStorage.getItem('userId');

    try {
      hashtagsArray = textArea.value.match(/((#[a-z]+)\w)/g);
      if (!editStatus) {
        await savePost(textArea.value, uid, hashtagsArray);
      } else {
        await updatePost(id, {
          message: textArea.value,
          hashtags: hashtagsArray,
        });

        editStatus = false;
        id = '';
        btnPost.innerHTML = 'Publicar';
      }

      formHome.reset();
    } catch (error) {
      console.log(error);
    }
  });
  return postContainer;
}
