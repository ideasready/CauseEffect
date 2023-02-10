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
  if (findByUsername(username)) {
    const index = data.findIndex((item) => item.username === username);
    if (index !== -1) {
      data.splice(index, 1);
    }
    saveInLocalStorage();
    return true;
  } else {
    return false;
  }
}

export function getIndexByUsername(username) {
  return data.findIndex((item) => item.username === username);
}

export function update(index, item) {
  try {
    data[index] = item;
    saveInLocalStorage();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function getAll() {
  return data;
}

function saveInLocalStorage() {
  localStorage.setItem('data', JSON.stringify(data));
}