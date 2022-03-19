export default function loadNavbar() {
  const header = document.createElement('section');
  header.innerHTML = `<navbar class="nav-bar">
    <div class="nav-bar-container">

      <form class = "search-bar" action="">
        <input class="search-in" type="text" placeholder="Buscar en Mapask">
        <img class="search" src='https://svgshare.com/i/fAN.svg' title='Search' />
      </form>

      <ul class="icon-home">
        <li><a href="#" data-path="/home" id="home"><img class="mapask" src='https://svgshare.com/i/f6U.svg'
              title='Home'/></a>
        </li>
      </ul>

      <ul class="icons-bar">
        <li><a href="#" ><img class="log-out" src='https://svgshare.com/i/fAy.svg' title='LogOut' /></a></li>
        <li><a href="#" data-path="/home" id="home"><img class="home" src='https://svgshare.com/i/fEX.svg' title='Home'/></a></li>
        <li><a href="#" data-path="/profile" id="profileBtn"><img class="img-profile" src='https://svgshare.com/i/f5r.svg'
              title='Profile' /></a></li>
      </ul>
    </div>
  </navbar>`;
  return header;
}
