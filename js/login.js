import { findByUsername } from './database.js';

// get inputs
const user = document.getElementById('user');
const pass = document.getElementById('pass');

// get error message
const error = document.getElementById('error');
const toggle = document.getElementById('toggleError');
// get button
const btn = document.getElementById('btn');

// btn event listener
btn.addEventListener('click', function () {
  login();
});

// event for enter key
document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    login();
  }
});

function login() {
  // get user value
  const userValue = user.value;
  // get pass value
  const passValue = pass.value;

  // check if user exists
  if (findByUsername(userValue)) {
    let user = findByUsername(userValue);
    // check if pass is correct
    if (user.password === passValue) {
      if (user.role === 'admin') {
        window.location.href = 'pages/admin.html';
      } else {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'pages/user.html';
      }
    } else {
      // wrong pass
      console.log('Wrong password');
      toggle.style.opacity = '1';
      toggle.style.transition = 'all 0.5s ease-out';
      error.innerHTML = 'Wrong password';
    }
  }
}