export default function getUserDetails() {
  const userStorage = localStorage.getItem("userDetails");
  const user = userStorage !== null && JSON.parse(userStorage);
  return user;
}
