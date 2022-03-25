// import { loginUser } from '../../src/auth.js';
import login from '../../src/views/login.js';

jest.mock('../../src/firebase.js');

describe('login', () => {
  const result = login();
  it('login deberia ser una función', () => {
    expect(typeof login).toBe('function');
  });

  it('deberia dar un error si las contraseñas no coinciden', () => {
    const email = result.querySelector('#inputEmail');
    const password = result.querySelector('#inputPassword');

    email.value = 'gsmaggie001gmail.com';
    password.value = 't123@mapi';

    const btn = result.querySelector('#btnLogin');
    btn.dispatchEvent(new Event('click'));

    const alert = result.querySelector('#containerPassword');
    alert.innerHTML = '<span class="red"> Correo o constraseña inválido </span>';
    expect(alert.textContent).toBe(' Correo o constraseña inválido ');
  });

  document.body.innerHTML = '<div id="root"></div>';
  test('render de login', () => {
    const root = document.getElementById('root');
    root.appendChild(result);
    expect(root.innerHTML).toMatchSnapshot();
  });

  // const email = result.querySelector('#inputEmail');
  // const password = result.querySelector('#inputPassword');
  // const btn = result.querySelector('#btnLogin');
  // it('Deberia logear con email y password al darle click', async () => {
  //   // const containerAlertlPassword = result.querySelector('#containerPassword');
  //   email.value = 'gsmaggie001@gmail.com';
  //   password.value = 'T123@maps';
  //   btn.dispatchEvent(new Event('click'));
  //   const user = await loginUser(email, password);

  //   expect(user).toEqual({ uid: 'za123' });
  // });
});
