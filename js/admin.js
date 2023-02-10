import { add, getAll, getIndexByUsername } from './database.js';
// get buttons
const btn_create = document.getElementById('btn-create');
const btn_delete = document.getElementById('btn-delete');
const btn_update = document.getElementById('btn-update');
const btn_logout = document.getElementById('btn-logout');
const btn_create_user = document.getElementById('btn-create-user');
const btn_close = document.getElementById('btn-close');

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
  const data = getAll();
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
          <button class="btn-delete" id="btn-delete">Delete</button>
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

btn_delete.addEventListener('click', function () {
  const username = prompt('Enter username');
  if (username) {
    const index = getIndexByUsername(username);
    if (index !== -1) {
      const data = getAll();
      data.splice(index, 1);
      loadTable();
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
    const user = add({
      username: userValue,
      password: passValue,
      role: roleValue,
      fistName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
    });
    if (user) {
      popup.style.display = 'none';
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


