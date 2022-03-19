import loadNavbar from './navbar.js';

export default function profile() {
  const container = document.createElement('div');
  const profileContent = document.createElement('section');
  profileContent.classList.add('container-profile');

  profileContent.innerHTML = `

      <aside class="profile-primary">
        <section class="container-profile-users" id="containerProfileUsers"></section>     
          <form id="formProfile" class="form-Profile">
              <input type="file" id="photo-user" name="photo-user"><br>
              <input type="text" id="userProfession" name="user-profession"  class="input" placeholder="Profesion: "><br>
              <input type="text" id="userHobbie" name="user-hobbie"  class="input" placeholder="Gustos: "><br>
              <input input"type="text" id="userAboutMe" name="user-about-me"  class="input" placeholder="Sobre mi: "><br>
              <button type="submit" id="btnUpdateDats" class="btn-updateDats button" >Actualizar datos</button>
          </form>
      </aside>
      <section class="posts">
      </section>
      <aside class="hash-secundary">
      </aside>

`;

  container.appendChild(loadNavbar());
  container.appendChild(profileContent);
  return container;
}
