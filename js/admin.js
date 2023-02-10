import {
  add,
  getAll,
  findByRemove,
  findByUsername,
  update,
  getIndexByUsername
} from './database.js';

let data;

// get buttons
const btn_create = document.getElementById('btn-create');
const btn_logout = document.getElementById('btn-logout');
const btn_create_user = document.getElementById('btn-create-user');
const btn_update_user = document.getElementById('btn-update-user');
const btn_close = document.getElementById('btn-close');

btn_update_user.style.display = 'none';
// get popup
const popup = document.getElementById('popup');

// get inputs
const user = document.getElementById('user');
const pass = document.getElementById('pass');
const role = document.getElementById('role');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');

// load table
const tbody = document.getElementById('users');

function loadTable() {
  data = getAll();
  tbody.innerHTML = '';
  data.forEach((item) => {
    tbody.innerHTML += `
      <tr>
        <td>${item.username}</td>
        <td>${item.fistName}</td>
        <td>${item.lastName}</td>
        <td>${item.email}</td>
        <td>${item.role}</td>
        <td>
          <button class="btn-update">Update</button>
          <button class="btn-delete">Delete</button>
        </td>
      </tr>
    `;
  });
}
loadTable();

// btn event listener
btn_logout.addEventListener('click', function () {
  window.location.href = '../index.html';
});

// remove user
tbody.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-delete')) {
    // verify if only one user admin exists
    const user = e.target.parentElement.parentElement.children[4].textContent;
    if (user === 'admin' && data.length === 1) {
      alert('You can not delete the last user admin');
      return;
    } else {
      const username = e.target.parentElement.parentElement.children[0].textContent;
      // verify if user exists
      const index = findByRemove(username); // remove user
      if (index) {
        loadTable(); // reload table
        return;
      } else {
        alert('User not found');
        return;
      }
    }
  }

  if (e.target.classList.contains('btn-update')) {
    btn_create_user.style.display = 'none';
    const username = e.target.parentElement.parentElement.children[0].textContent;
    const index = getIndexByUsername(username);
    const userFound = findByUsername(username);
    if (userFound) {
      // set inputs
      user.value = userFound.username;
      pass.value = userFound.password;
      role.value = userFound.role;
      firstName.value = userFound.fistName;
      lastName.value = userFound.lastName;
      email.value = userFound.email;

      popup.style.display = 'block';
      btn_update_user.style.display = 'block';

      btn_update_user.addEventListener('click', function () {
        if (user.value && pass.value && role.value && firstName.value && lastName.value && email.value) {
          const newUser = update(index, {
            username: user.value,
            password: pass.value,
            role: role.value,
            fistName: firstName.value,
            lastName: lastName.value,
            email: email.value,
          });

          if (newUser) {
            // clear inputs
            user.value = '';
            pass.value = '';
            role.value = '';
            firstName.value = '';
            lastName.value = '';
            email.value = '';

            popup.style.display = 'none';
            btn_update_user.style.display = 'none';
            btn_create_user.style.display = 'block';
            loadTable(); // reload table
          } else {
            alert('User already exists');
          }
        }

      });
    } else {
      alert('User not found');
    }
  }
});

// btn event listener popup
btn_create.addEventListener('click', function () {
  popup.style.display = 'block';
});

btn_close.addEventListener('click', function () {
  popup.style.display = 'none';
});

btn_create_user.addEventListener('click', function () {
  const userValue = user.value,
    passValue = pass.value,
    roleValue = role.value,
    firstNameValue = firstName.value,
    lastNameValue = lastName.value,
    emailValue = email.value;

  if (userValue && passValue && roleValue && firstNameValue && lastNameValue && emailValue) {
    const newUser = add({
      username: userValue,
      password: passValue,
      role: roleValue,
      fistName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
    });

    if (newUser) {
      // clear inputs
      user.value = '';
      pass.value = '';
      role.value = '';
      firstName.value = '';
      lastName.value = '';
      email.value = '';

      popup.style.display = 'none';
      loadTable(); // reload table
    } else {
      alert('User already exists');
    }
  }
});

window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    popup.style.display = 'none';
  }
});


