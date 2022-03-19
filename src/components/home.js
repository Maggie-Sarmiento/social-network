// import { listPosts } from './posts.js';
import loadNavbar from './navbar.js';

export default function home() {
  const container = document.createElement('div');
  const containerHome = document.createElement('section');
  containerHome.classList.add('container-home');
  containerHome.innerHTML = `
      <aside class="profile-home"></aside>
      <section class="posts-home">
        <form class="form-home" id="formHome" method="post">
          <textarea name="description-posts" class="description-Posts" id="descriptionPosts"
          cols="4" placeholder="¿Sobre que quieres hablar?"></textarea>
          <button type="submit" class="btn-post" id="btnPost">Publicar</button>
        </form>
        <section class="post-container" id="postContainer">
        </section>
      </section>
      <aside class="hash-home">

      </aside>
  `;
  container.appendChild(loadNavbar());
  container.append(containerHome);
  return container;
}

/* export function home() {
  const containerHome = document.createElement('section');
  containerHome.classList.add('.container-home');

containerHome.innerHTML = ``; */

//   const texto = document.createElement('p');
//   texto.innerText = 'hola';
//   const divPrueba = document.createElement('div');
//   divPrueba.className = 'color';
//   divPrueba.appendChild(texto);

//   // const div = document.querySelector('.color');
//   divPrueba.addEventListener('click', () => {
//     console.log('clickeado..');
//   });
//   return divPrueba;
// }

/* const home = `
  <main>
    <section class="container-home">
      <aside class="profile-home"></aside>
      <section class="posts-home">
        <form class="form-home" id="formHome" method="post">
          <textarea name="description-posts" class="description-Posts" id="descriptionPosts"
          cols="4" placeholder="¿Sobre que quieres hablar?"></textarea>
          <button type="submit" class="btn-posts" id="btnPosts">Publicar</button>
        </form>
      </section>
      <aside class="hash-home"></aside>
    </section>
  </main>
`; */
