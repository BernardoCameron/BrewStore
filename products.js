let productos = [];
let productosFiltrados = [];
let paginaActual = 1;
const porPagina = 6; // productos por página

document.addEventListener("DOMContentLoaded", () => {
  // Ruta corregida: products.html está en /assets/pages/
  fetch("../db.json")
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar db.json");
      return res.json();
    })
    .then(data => {
      console.log("Datos cargados:", data); // debug
      productos = data.products || [];
      productosFiltrados = productos;
      renderProductos();
      renderPaginador();
    })
    .catch(err => console.error("Error al cargar productos:", err));

  // Listener del filtro
  const filtro = document.getElementById("categoriaFiltro");
  if (filtro) {
    filtro.addEventListener("change", (e) => {
      const categoria = e.target.value;
      productosFiltrados = categoria
        ? productos.filter(p => p.category === categoria)
        : productos;

      paginaActual = 1;
      renderProductos();
      renderPaginador();
    });
  }
});

function renderProductos() {
  const contenedor = document.getElementById("productos-list");
  if (!contenedor) return;
  contenedor.innerHTML = "";

  // Calcular rango de productos en esta página
  const inicio = (paginaActual - 1) * porPagina;
  const fin = inicio + porPagina;
  const productosPagina = productosFiltrados.slice(inicio, fin);

  if (productosPagina.length === 0) {
    contenedor.innerHTML = `<p class="text-center">No hay productos para mostrar.</p>`;
    return;
  }

  productosPagina.forEach(producto => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 mb-4";
    card.innerHTML = `
      <div class="card card-custom h-100">
        <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
        <div class="card-body">
          <h5 class="card-title">${producto.name} (Pack x6)</h5>
          <p class="card-text">${producto.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="price">${producto.price}</span>
            <button class="btn btn-primary-custom btn-sm">Agregar</button>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

function renderPaginador() {
  const totalPaginas = Math.ceil(productosFiltrados.length / porPagina);
  const paginador = document.getElementById("paginador");
  if (!paginador) return;

  paginador.innerHTML = "";
  if (totalPaginas <= 1) return;

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === paginaActual ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      paginaActual = i;
      renderProductos();
      renderPaginador();
    });
    paginador.appendChild(li);
  }
}
