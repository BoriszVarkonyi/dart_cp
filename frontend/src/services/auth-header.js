export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("Ezzel a tokennel postol (ez a auth-headerben van):")
  console.log(user.access)
  if (user && user.access) {
    return `Bearer ${user.access}`;
  } else {
    return {};
  }
}