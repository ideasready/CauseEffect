import { findByUsername } from './database.js';

// get inputs
const user = document.getElementById('user');
const pass = document.getElementById('pass');

// get button
const btn = document.getElementById('btn');

// btn event listener
btn.addEventListener('click', function () {
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
        window.location.href = 'pages/user.html';
      }
    } else {
      // wrong pass
      console.log('Wrong password');
    }
  }

});