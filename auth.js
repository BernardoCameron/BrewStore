// Estado global (vive mientras la página está abierta sin recargar)
let usuarioActual = null;

// Simulación de login
function login(username, password) {
  if (username === "admin" && password === "admin") {
    usuarioActual = { username: "admin", email: "admin@brewstore.com" };
    return true;
  }
  return false;
}

// Simulación de logout
function logout() {
  usuarioActual = null;
  renderNavbar();
}

// Renderiza la navbar según el estado
function renderNavbar() {
  const nav = document.getElementById("navbar-auth");
  if (!nav) return;

  if (usuarioActual) {
    nav.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="perfil.html">Mi Perfil</a>
      </li>
      <li class="nav-item">
        <button class="btn btn-outline-light btn-sm ms-2" onclick="logout()">Cerrar Sesión</button>
      </li>
    `;
  } else {
    nav.innerHTML = `
      <li class="nav-item">
        <a href="/pages/login.html" class="btn btn-primary-custom btn-sm ms-2">Iniciar Sesión</a>
      </li>
    `;
  }
}

document.addEventListener("DOMContentLoaded", renderNavbar);
