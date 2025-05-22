const carouseles = [
  {
    id: "carouselMenos5",
    juegos: [
      { titulo: "Hollow Knight", precio: "4.99", imagen: "hollow_knight.jpg" },
      { titulo: "Stardew Valley", precio: "4.99", imagen: "stardew_valley.png" },
      { titulo: "Buckshot Roulette", precio: "1.49", imagen: "buckshot_roulette.jpg" },
      { titulo: "Content Warning", precio: "4.49", imagen: "content_warning.jpg" },
      { titulo: "Backrooms: Escape Together", precio: "4.49", imagen: "backrooms.jpg" }
    ],
    rutaImagen: "./img/16_9/menos5usd/"
  },
  {
    id: "carouselMenos10",
    juegos: [
      { titulo: "The Headliners", precio: "4.49", imagen: "the_headliners.jpg" },
      { titulo: "Left 4 Dead 2", precio: "5.79", imagen: "left_4_dead_2.jpg" },
      { titulo: "Garry's Mod", precio: "5.79", imagen: "garrys_mod.jpg" },
      { titulo: "Dark Hours", precio: "5.79", imagen: "dark_hours.jpg" },
      { titulo: "Escape The Backrooms", precio: "5.79", imagen: "escape_the_backrooms.jpg" }
    ],
    rutaImagen: "./img/16_9/menos10usd/"
  }
];

function generarCarrusel({ id, juegos, rutaImagen }) {
  const contenedor = document.getElementById(id);
  if (!contenedor) return;

  const inner = contenedor.querySelector('.carousel-inner');
  const indicators = contenedor.querySelector('.carousel-indicators');
  inner.innerHTML = "";
  indicators.innerHTML = "";

  juegos.forEach((juego, index) => {
    const active = index === 0 ? "active" : "";

    inner.innerHTML += `
      <div class="carousel-item ${active}">
        <img src="${rutaImagen}${juego.imagen}" class="d-block w-100" alt="${juego.titulo}">
        <a href="#" target="_blank">
          <div class="carousel-caption d-md-block texto_carousel">
            <h5>${juego.titulo}</h5>
            <p class="precio">${juego.precio} USD</p>
            <p class="comprar">COMPRAR</p>
          </div>
        </a>
      </div>
    `;

    indicators.innerHTML += `
      <button type="button" data-bs-target="#${id}" data-bs-slide-to="${index}" class="${active}" ${active ? 'aria-current="true"' : ''} aria-label="Slide ${index + 1}"></button>
    `;
  });
}

carouseles.forEach(generarCarrusel);

