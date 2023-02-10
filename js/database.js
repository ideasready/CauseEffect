const data = [];

export function add(item) {
  data.push(item);
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

add({ username: 'user', password: 'user' });
