const user = JSON.parse(localStorage.getItem('user'));
const btn = document.getElementById('btn');

console.log(user);

btn.addEventListener('click', function () {
  localStorage.removeItem('user');
  window.location.href = '../index.html';
});

// field for user
const dataField = document.getElementById('data');

dataField.innerHTML = `
    <p><strong>Username:</strong>${user.username}</p>
    <p><strong>First Name:</strong>${user.fistName}</p>
    <p><strong>Last Name:</strong>${user.email}</p>
    <p><strong>Email:</strong>${user.username}</p>
    <p><strong>Role:</strong>${user.role}</p>
  `