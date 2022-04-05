/* eslint-disable import/no-cycle */
// import { listPosts } from './posts.js';
import loadHashtag from '../components/hashtag.js';
// import loadNewUsers from '../components/newUsers.js';
import loadNavbar from '../components/navbar.js';
import { listPosts } from '../components/posts.js';
import { popUpDelete } from '../components/popDelete.js';

export default function home() {
  // Home
  const homes = document.createElement('section');
  homes.classList.add('homes');
  homes.id = 'homes';
  homes.appendChild(popUpDelete());
  homes.appendChild(loadNavbar());

  // Contenedor de Home
  const container = document.createElement('section');
  container.classList.add('container-home');

  // aside izquierdo de Home
  const asideLeftHome = document.createElement('aside');
  asideLeftHome.classList.add('profile-home');
  const imgAsideH = document.createElement('img');
  imgAsideH.classList.add('imgAsideH');
  imgAsideH.src = 'https://svgshare.com/i/fjq.svg';
  asideLeftHome.appendChild(imgAsideH);
  container.appendChild(asideLeftHome);

  // -----  Seccion principal de Home (Posts)
  const sectionPostHome = document.createElement('section');
  sectionPostHome.classList.add('posts-home');

  // Form de enviar y actualizar post
  const formHome = document.createElement('form');
  formHome.classList.add('form-home');
  formHome.id = 'formHome';

  // TextArea del form
  const textAreaFormHome = document.createElement('textArea');
  textAreaFormHome.classList.add('description-Posts');
  textAreaFormHome.id = 'descriptionPosts';
  textAreaFormHome.name = 'description-posts';
  textAreaFormHome.placeholder = '¿Sobre que quieres hablar?';

  // Boton del form enviar post
  const btnSendPost = document.createElement('button');
  btnSendPost.type = 'submit';
  btnSendPost.classList.add('btn-post');
  btnSendPost.id = 'btnPost';
  btnSendPost.innerText = 'Publicar';
  formHome.appendChild(textAreaFormHome);
  formHome.appendChild(btnSendPost);
  // Agregando el form a la Sección principal
  sectionPostHome.appendChild(formHome);
  sectionPostHome.appendChild(listPosts(formHome, btnSendPost));

  // Seccion del post container (contiene los posts)
  const sectionPostsContainer = document.createElement('section');
  sectionPostsContainer.classList.add('post-container');
  sectionPostsContainer.id = 'postContainer';
  sectionPostHome.appendChild(sectionPostsContainer);
  container.appendChild(sectionPostHome);

  // Aside Derecho del home
  const asideRightHome = document.createElement('aside');
  asideRightHome.classList.add('hash-home');
  // asideRightHome.appendChild(loadNewUsers());
  asideRightHome.appendChild(loadHashtag());
  container.appendChild(asideRightHome);
  homes.appendChild(container);
  return homes;
}
