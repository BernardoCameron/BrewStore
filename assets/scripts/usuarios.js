function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [
    { username: "admin", email: "admin@brewstore.com", password: "admin" }
  ];
}

if (user) {
  alert("¡Bienvenido " + user.username + "!");
  localStorage.setItem("usuarioActual", JSON.stringify(user)); // ⬅️ guardar en localStorage
  window.location.href = "perfil.html";
}

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("usuarioActual");
  alert("Sesión cerrada.");
  window.location.href = "login.html";
});

function saveUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function addUsuario(username, email, password) {
  const usuarios = getUsuarios();

  if (usuarios.find(u => u.username === username || u.email === email)) {
    return false; // ya existe
  }

  usuarios.push({ username, email, password });
  saveUsuarios(usuarios);
  return true;
}

function findUsuario(username, password) {
  const usuarios = getUsuarios();
  return usuarios.find(u => u.username === username && u.password === password);
}

function findUsuarioByName(username) {
  const usuarios = getUsuarios();
  return usuarios.find(u => u.username === username);
}

function updateUsuario(oldUsername, newUsername, newEmail, newPassword) {
  const usuarios = getUsuarios();
  const index = usuarios.findIndex(u => u.username === oldUsername);

  if (index !== -1) {
    usuarios[index].username = newUsername;
    usuarios[index].email = newEmail;
    if (newPassword) usuarios[index].password = newPassword;
    saveUsuarios(usuarios);
    return usuarios[index];
  }
  return null;
}
function resetUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify([
    { username: "admin", email: "admin@brewstore.com", password: "admin" }
  ]));
}


