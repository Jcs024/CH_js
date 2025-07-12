function generarCarrusel({ id, juegos, rutaImagen }) {
  try {
    const contenedor = document.getElementById(id);
    if (!contenedor) return;

    const inner = contenedor.querySelector('.carousel-inner');
    const indicators = contenedor.querySelector('.carousel-indicators');
    inner.innerHTML = "";
    indicators.innerHTML = "";

    juegos.forEach((juego, index) => {
      const active = index === 0 ? "active" : "";

      const item = document.createElement("div");
      item.className = `carousel-item ${active}`;

      const img = document.createElement("img");
      img.src = rutaImagen + juego.imagen;
      img.className = "d-block w-100";
      img.alt = juego.titulo;

      const link = document.createElement("a");
      link.href = "#";
      link.target = "_blank";

      const caption = document.createElement("div");
      caption.className = "carousel-caption d-md-block texto_carousel";

      const h5 = document.createElement("h5");
      h5.textContent = juego.titulo;

      const pPrecio = document.createElement("p");
      pPrecio.className = "precio";
      pPrecio.textContent = `${juego.precio} USD`;

      const pComprar = document.createElement("p");
      pComprar.className = "comprar";
      pComprar.dataset.titulo = juego.titulo;
      pComprar.textContent = "COMPRAR";

      caption.appendChild(h5);
      caption.appendChild(pPrecio);
      caption.appendChild(pComprar);
      link.appendChild(caption);

      item.appendChild(img);
      item.appendChild(link);
      inner.appendChild(item);

      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.setAttribute("data-bs-target", `#${id}`);
      indicator.setAttribute("data-bs-slide-to", index);
      if (active) {
        indicator.classList.add("active");
      }
      indicators.appendChild(indicator);
    });
  } catch (error) {
    mostrarMensaje("Ocurrió un error al cargar el carrusel.", "error");
  }
}


const URL_CARRUSELES = "../db/carouseles.json";

function obtenerCarouseles() {
  fetch(URL_CARRUSELES)
    .then((response) => response.json())
    .then((data) => {
      window.carouseles = data;
      data.forEach(generarCarrusel);
    })
    .catch(() => {
      mostrarMensaje("No se pudieron cargar los carruseles", "error");
    });
}


obtenerCarouseles();
