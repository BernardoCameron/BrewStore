
//cards index, top 6 
document.addEventListener("DOMContentLoaded", () => {
  fetch("db.json")
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
                  <button class="btn btn-primary-custom btn-sm">Agregar al Carrito</button>
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