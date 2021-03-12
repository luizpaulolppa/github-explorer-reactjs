export function saveUser(user: any) {
  let users: any = getUsers();
  users = users.filter((u: any) => {
    return u.id !== user.id;
  });
  users.push(user);
  localStorage.setItem('@GithubExplorer:users', JSON.stringify(users));
}

export function getUsers() {
  return JSON.parse(localStorage.getItem('@GithubExplorer:users') || '[]');
}

export function findUserbyUsername(username: string) {
  return getUsers().find((user: any) => user.login === username);
}
