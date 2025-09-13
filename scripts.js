//cards index, top 6 
document.addEventListener("DOMContentLoaded", () => {
  fetch("/db.json")
    .then(res => res.json())
    .then(data => {
      const productos = data.products.slice(0, 6);
      const contenedor = document.getElementById("productos-list");

      productos.forEach(producto => {
        const badge = producto.isFeatured
          ? `<span class="badge badge-popular">Popular</span>`
          : `<span class="badge badge-nuevo">Nuevo</span>`;

        const cardHTML = `
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card card-custom h-100">
              <img src="${producto.image}" class="card-img-top" alt="Pack ${producto.name}">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h5 class="card-title">${producto.name} (Pack x6)</h5>
                  ${badge}
                </div>
                <p class="card-text">${producto.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="price">${producto.price}</span>
                  <input type="number" min="1" value="1" class="form-control form-control-sm w-25" id="cantidad-${producto.id}">
                  <button class="btn btn-primary-custom btn-sm" onclick="agregarAlCarrito(${producto.id})">Agregar</button>
                </div>
              </div>
            </div>
          </div>
        `;
        contenedor.innerHTML += cardHTML;
      });
    })
    .catch(error => console.error("Error al cargar productos:", error));
});

// carrito

let carrito = [];

function agregarAlCarrito(id) {
  // busca si hay productos ya agregados
  let producto = null;

  if (typeof productos !== "undefined" && productos.length > 0) {
    producto = productos.find(p => p.id === id);
  }

  // 
  const cargarProducto = producto
    ? Promise.resolve(producto)
    : fetch("db.json")
        .then(res => res.json())
        .then(data => data.products.find(p => p.id === id));

  cargarProducto.then(producto => {
    if (!producto) return;

    const inputCantidad = document.getElementById(`cantidad-${id}`);
    const cantidad = inputCantidad ? parseInt(inputCantidad.value) : 1;

    if (cantidad < 1) return;

    const existente = carrito.find(p => p.id === id);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({ ...producto, cantidad });
    }

    renderCarrito();
  });
}



function calcularTotal() {
  let total = 0;
  carrito.forEach(item => {
    const precio = parseInt(item.price.replace(/\D/g, ""));
    total += precio * item.cantidad;
  });

  const totalElement = document.getElementById("carrito-total");
  if (totalElement) {
    totalElement.textContent = `$${total.toLocaleString("es-CL")} CLP`;
  }
}

function renderCarrito() {
  const contenedor = document.getElementById("carrito-contenido");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='text-muted'>Tu carrito está vacío.</p>";

    // reset
    const totalElement = document.getElementById("carrito-total");
    if (totalElement) {
      totalElement.textContent = "$0 CLP";
    }

    return;
  }

  carrito.forEach(item => {
    const fila = document.createElement("div");
    fila.className = "mb-3 border-bottom pb-2";

    fila.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.price}</small>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${item.id}, -1)">-</button>
          <span>${item.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${item.id}, 1)">+</button>
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${item.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    contenedor.appendChild(fila);
  });

  calcularTotal(); // vuelve a calcular al final
}


function cambiarCantidad(id, cambio) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;

  item.cantidad += cambio;
  if (item.cantidad <= 0) eliminarDelCarrito(id);
  renderCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  renderCarrito();
}

function finalizarCompra() {
  alert("¡Gracias por tu compra!");
  carrito = [];
  renderCarrito();
}

//render btn login/iniciar

document.addEventListener("DOMContentLoaded", () => {
  const navAuth = document.getElementById("navbar-auth");
  if (!navAuth) return;

  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

  if (usuarioActual) {
    // revisar si hay una sesion
    navAuth.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="perfil.html">Perfil (${usuarioActual.username})</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-danger" href="#" id="logout-link">Cerrar Sesión</a>
      </li>
    `;

    // btn cerrar sesion
    document.getElementById("logout-link").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuarioActual");
      window.location.href = "../BrewStore/index.html";
    });

  } else {
    // si no hay sesion agrega el btn iniciar sesion
    navAuth.innerHTML = `
      <li class="nav-item">
        <a href="/pages/login.html" class="btn btn-primary-custom btn-sm ms-2">Iniciar Sesión</a>
      </li>
    `;
  }
});
