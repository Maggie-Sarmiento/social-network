// eslint-disable-next-line import/no-cycle
import loadNavbar from '../components/navbar.js';
import { onGetPosts, getPost, updatePost } from '../firestore.js';
import { getUser } from '../user-firestore.js';
import { getImage } from '../storage.js';

let arrayPost = [];
export default function () {
  const container = document.createElement('div');
  container.classList.add('posts-homes');
  container.appendChild(loadNavbar());
  const postContainerF = document.createElement('div');
  postContainerF.classList.add('posts-container');
  const postContainer = document.createElement('div');
  postContainerF.innerHTML = null;
  postContainerF.appendChild(postContainer);
  postContainer.innerHTML = null;
  onGetPosts(async (doc) => {
    arrayPost = [];
    doc.forEach((post) => {
      if (post.data().hashtags) {
        arrayPost.push({
          id: post.id,
          info: post.data(),
        });
      }
    });

    const hashValue = sessionStorage.getItem('hash');
    const arrayFilterPost = arrayPost.filter((post) => post.info.hashtags.includes(hashValue));

    arrayFilterPost.forEach(async (post) => {
      if (postContainer.firstChild) {
        postContainer.removeChild(postContainer.firstChild);
      }
      const user = await getUser(post.info.userId);
      const name = user.data().userName;
      const lastName = user.data().userLastName;
      const image = user.data().image;
      const postContainerCard = document.createElement('section');
      postContainerCard.classList.add('post-container-card');
      // Contenedor del parrafo del nombre y apellido
      const pNameUser = document.createElement('p');
      pNameUser.innerHTML = `${name} ${lastName}`;

      // Contenedor del parrafo del post
      const pPost = document.createElement('p');
      pPost.innerHTML = post.info.message;

      // -- Contenedor de botones
      const postContainerButtons = document.createElement('div');
      postContainerButtons.classList.add('post-container-btn');

      // Boton de Likes
      const btnLikePost = document.createElement('button');
      btnLikePost.classList.add('btn-likes');
      btnLikePost.setAttribute('data-id', post.id);
      const imgButton = document.createElement('img');
      imgButton.classList.add('icon-likes');
      imgButton.setAttribute('data-id', post.id);
      imgButton.title = 'corazon sin rellenar';
      // imgButton.src = 'https://svgshare.com/i/fEh.svg';
      imgButton.src = 'https://svgshare.com/i/fhR.svg';
      btnLikePost.appendChild(imgButton);

      // espacio para el contador de los likes
      const containerLikes = document.createElement('div');
      containerLikes.classList.add('container-likes');
      const contLikes = document.createElement('span');
      contLikes.innerText = `${post.info.likes}`;
      containerLikes.appendChild(btnLikePost);
      containerLikes.appendChild(contLikes);

      // contenedor de la imagen
      const divImage = document.createElement('div');
      divImage.classList.add('div-image');
      // Agregar container p y container button a Container general
      let showImagePost;
      await getImage(image).then((url) => {
        showImagePost = document.createElement('img');
        showImagePost.classList.add('show-image-post');
        showImagePost.src = url;
      });

      divImage.append(showImagePost);
      divImage.appendChild(pNameUser);
      postContainerCard.appendChild(divImage);
      postContainerCard.appendChild(pPost);
      postContainerCard.appendChild(postContainerButtons);
      postContainer.appendChild(postContainerCard);
      postContainerButtons.appendChild(containerLikes);

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
    });
  });
  container.appendChild(postContainerF);

  return container;
}
