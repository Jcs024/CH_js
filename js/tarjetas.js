
const tarjetasPorSeccion = [
    [
      { img: "fortnite_2_3.jpg", nombre: "Tarjetas de Regalo Fortnite", precio: "10 USD" },
      { img: "ps_plus_2_3.jpg", nombre: "Ps Plus Essential 3 meses", precio: "20 USD" },
      { img: "regalo_steam_2_3.jpeg", nombre: "Tarjetas de Regalo Steam", precio: "5 USD" },
      { img: "regalo_xbox_2_3.webp", nombre: "Xbox Game Pass Ultimate 12 meses", precio: "60 USD" },
      { img: "roblox_2_3.jpg", nombre: "Tarjeta de Regalo Robux", precio: "5 USD" },
    ],
    [
      { img: "fortnite_2_3.jpg", nombre: "Tarjetas de Regalo Fortnite", precio: "25 USD" },
      { img: "ps_plus_2_3.jpg", nombre: "Ps Plus Essential 3 meses", precio: "20 USD" },
      { img: "regalo_steam_2_3.jpeg", nombre: "Tarjetas de Regalo Steam", precio: "10 USD" },
      { img: "regalo_xbox_2_3.webp", nombre: "Xbox Game Pass Ultimate 12 meses", precio: "120 USD" },
      { img: "roblox_2_3.jpg", nombre: "Tarjeta de Regalo Robux", precio: "10 USD" },
    ],
    [
        { img: "fortnite_2_3.jpg", nombre: "Tarjetas de Regalo Fortnite", precio: "40 USD" },
        { img: "ps_plus_2_3.jpg", nombre: "Ps Plus Essential 3 meses", precio: "20 USD" },
        { img: "regalo_steam_2_3.jpeg", nombre: "Tarjetas de Regalo Steam", precio: "25 USD" },
        { img: "regalo_xbox_2_3.webp", nombre: "Xbox Game Pass Ultimate 12 meses", precio: "120 USD" },
        { img: "roblox_2_3.jpg", nombre: "Tarjeta de Regalo Robux", precio: "25 USD" },
    ],
    [
        { img: "fortnite_2_3.jpg", nombre: "Tarjetas de Regalo Fortnite", precio: "60 USD" },
        { img: "ps_plus_2_3.jpg", nombre: "Ps Plus Essential 3 meses", precio: "20 USD" },
        { img: "regalo_steam_2_3.jpeg", nombre: "Tarjetas de Regalo Steam", precio: "50 USD" },
        { img: "regalo_xbox_2_3.webp", nombre: "Xbox Game Pass Ultimate 12 meses", precio: "120 USD" },
        { img: "roblox_2_3.jpg", nombre: "Tarjeta de Regalo Robux", precio: "50 USD" },
    ],
    [
        { img: "fortnite_2_3.jpg", nombre: "Tarjetas de Regalo Fortnite", precio: "100 USD" },
        { img: "ps_plus_2_3.jpg", nombre: "Ps Plus Essential 3 meses", precio: "20 USD" },
        { img: "regalo_steam_2_3.jpeg", nombre: "Tarjetas de Regalo Steam", precio: "100 USD" },
        { img: "regalo_xbox_2_3.webp", nombre: "Xbox Game Pass Ultimate 12 meses", precio: "120 USD" },
        { img: "roblox_2_3.jpg", nombre: "Tarjeta de Regalo Robux", precio: "100 USD" },
    ],
  ];
  
  function crearTarjeta(tarjeta) {
    return `
      <a href="#" target="_blank">
        <div class="img_jg img_tj">
          <img src="../img/2_3/img_tajetas_juegos/${tarjeta.img}" alt="${tarjeta.nombre}">
          <h4>${tarjeta.nombre}</h4>
          <p class="precio">${tarjeta.precio}</p>
          <p class="comprar">COMPRAR</p>
        </div>
      </a>
    `;
  }
  
  function renderizarTarjetas() {
    const contenedor = document.getElementById("tarjetas-regalo-container");
  
    tarjetasPorSeccion.forEach((seccion, index) => {
      const tarjetasHTML = seccion.map(crearTarjeta).join("");
      contenedor.innerHTML += `
        <section class="prod_juegos prod_tarjetas">
          ${index === 0 ? "<h1>Tarjetas de Regalo</h1>" : ""}
          <div class="pr_jg pr_tj">${tarjetasHTML}</div>
        </section>
      `;
    });
  }
  
  renderizarTarjetas();
  
  