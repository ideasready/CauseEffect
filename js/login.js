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

  // check if user is admin
  if (userValue === 'admin') {
    // check if pass is correct
    if (passValue === 'admin') {
      // log in
      console.log('Logged in');
    } else {
      // wrong pass
      console.log('Wrong password');
    }
  } else if (findByUsername(userValue)) {
    // check if pass is correct
    if (findByUsername(userValue).password === passValue) {
      // log in
      console.log('Logged in');
    } else {
      // wrong pass
      console.log('Wrong password');
    }
  }

});