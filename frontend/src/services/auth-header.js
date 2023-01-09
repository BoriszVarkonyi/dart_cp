export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.access) {
    return `Bearer ${user.access}`;
  } else {
    return {};
  }
}