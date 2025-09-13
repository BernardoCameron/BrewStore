// ===========================
// Gestión de usuarios con localStorage
// ===========================

// Obtener usuarios (si no existen, inicializa con admin)
function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [
    { username: "admin", email: "admin@brewstore.com", password: "admin" }
  ];
}

// Guardar usuarios en localStorage
function saveUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Registrar nuevo usuario
function addUsuario(username, email, password) {
  const usuarios = getUsuarios();

  if (usuarios.find(u => u.username === username || u.email === email)) {
    return false; // ya existe
  }

  usuarios.push({ username, email, password });
  saveUsuarios(usuarios);
  return true;
}

// Buscar usuario por username + password
function findUsuario(username, password) {
  const usuarios = getUsuarios();
  return usuarios.find(u => u.username === username && u.password === password);
}

// Buscar usuario por username
function findUsuarioByName(username) {
  const usuarios = getUsuarios();
  return usuarios.find(u => u.username === username);
}

// Actualizar datos de usuario
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

// Resetear a solo admin (útil para pruebas)
function resetUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify([
    { username: "admin", email: "admin@brewstore.com", password: "admin" }
  ]));
}


