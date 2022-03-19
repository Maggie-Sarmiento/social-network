// aqui va el codigo js que maneja el login,
// ya sean addeventlisteners, logica del DOM y logica de uso
// aqui va la estructura de HTML de login
export default function login() {
  const content = document.createElement('section');
  content.classList.add('login');
  content.innerHTML = `
    <p class="welcome">Bienvenido</p>
    <h1>Mapask</h1>
    <p>Conecta con personas que se apasionan por la programación</p>

    <section class="image-login">
      <img src='https://svgshare.com/i/ept.svg' title='img-login' />
    </section>
    <section class="container-login">
      <h2>Mapask</h2>
      <form class="form-session" onsubmit="return false">
        <input class="input input-email" id="inputEmail" type="text" placeholder="Email: " required>
        <div class="container-email" id="containerEmail"></div>
        <input class="input input-password" id="inputPassword"
        type="password" placeholder="Contraseña: ">
        <div class="container-password" id="containerPassword"></div>
        <button class="button btn-login" id="btnLogin">Iniciar Sesión</button>
      </form>
      <div class="registration">
        <span>¿No estas en Mapask?</span>
        <a class="link-registration" id="linkRegistration">Registrate</a>
      </div>
      <button class="btn-google" id="btnGoogle">
        <span class="iconify" data-icon="akar-icons:google-contained-fill"></span>
        GOOGLE
      </button>
      <div id="alertGoogle"></div>
    </section>
    <section class="overlay" id="overlay">
      <div class="popup">
        <a class="btn-cerrar-popup" id="btnCerrarPopup">X</a>
        <h3>Registrarte en Mapask</h3>
        <p> es rápido y fácil</p>
        <form action="" class="form-registration">
          <input id="userName" class="input" type="text" placeholder="Nombre: ">
          <input id="userLastName" class="input" type="text" placeholder="Apellido: ">
          <input id="inputEmailR" class="input" type="email" placeholder="Correo: ">
          <input id="inputPasswordR" class="input" type="password" placeholder="Contraseña: ">
          <input id="inputPassConf" class="input" type="password" placeholder="Confirmar contraseña: ">
          <div class="container-email-r" id="containerEmailR"></div>

          <div class="date-of-birth">
            <label for="">Fecha de Nacimiento: </label>
            <input id="dateOfBirth" type="date">
          </div>
          
          <button class="button btn-registration" id="btnRegistration">Registrate</button>
        </form>
      </div>
    </section>
`;
  return content;
}