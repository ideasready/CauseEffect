const data = JSON.parse(localStorage.getItem('data')) || [];

export function add(item) {

  if (findByUsername(item.username)) {
    console.log('User already exists');
    return false;
  } else {
    data.push(item);
    saveInLocalStorage();
    return true;
  }
}

export function findByUsername(username) {
  return data.find((item) => item.username === username);
}

export function findByRemove(username) {
  const index = data.findIndex((item) => item.username === username);
  if (index !== -1) {
    data.splice(index, 1);
  }
}

export function getIndexByUsername(username) {
  return data.findIndex((item) => item.username === username);
}

export function update(index, item) {
  data[index] = item;
}

export function getAll() {
  return data;
}

function saveInLocalStorage() {
  localStorage.setItem('data', JSON.stringify(data));
}