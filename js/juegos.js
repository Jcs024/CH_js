/* 1) —————————————————————————————————————————————————————————————————————————————————————
   DATOS Y RENDERIZADO DEL CATÁLOGO
   ————————————————————————————————————————————————————————————————————————————————————— */
const juegos = [
    {
      titulo: "EA SPORTS FC 25 Standard Edition Código de XBOX LIVE",
      precio: "25",
      imagen: "./img/2_3/img_juegos/fc25_2_3.jpg",
      link: ""
    },
    {
      titulo: "God of War Ragnarök (PC) Código de Steam GLOBAL",
      precio: "50",
      imagen: "./img/2_3/img_juegos/gowr_2_3.jpg",
      link: ""
    },
    {
      titulo: "HELLDIVERS 2 (PC) Código de Steam GLOBAL",
      precio: "34",
      imagen: "./img/2_3/img_juegos/hd2_2_3.jpg",
      link: ""
    },
    {
      titulo: "Minecraft: Java & Bedrock Edition (PC) Official website Key GLOBAL",
      precio: "16",
      imagen: "./img/2_3/img_juegos/mc_2_3.jpg",
      link: ""
    },
    {
      titulo: "Assassin’s Creed Shadows (PC) Código de Ubisoft Connect GLOBAL",
      precio: "60",
      imagen: "./img/2_3/img_juegos/acs_2_3.jpg",
      link: ""
    },
    {
      titulo: "Avowed (PC/Xbox Series) Código de XBOX LIVE GLOBAL",
      precio: "65",
      imagen: "./img/2_3/img_juegos/avowed_2_3.png",
      link: ""
    },
    {
      titulo: "Sid Meier's Civilization® VII (PC) Código de Steam GLOBAL",
      precio: "15",
      imagen: "./img/2_3/img_juegos/civ7_2_3.jpg",
      link: ""
    },
    {
      titulo: "The Last of Us™ Part II Remastered (PC) Steam Key ROW",
      precio: "45",
      imagen: "./img/2_3/img_juegos/loup2r_2_3.jpg",
      link: ""
    },
    {
      titulo: "Monster Hunter Wilds Premium Deluxe Edition (PC)",
      precio: "85",
      imagen: "./img/2_3/img_juegos/mhw_2_3.jpg",
      link: ""
    },
    {
      titulo: "Red Dead Redemption 2 Rockstar Games Launcher Clave GLOBAL",
      precio: "16",
      imagen: "./img/2_3/img_juegos/rdr2_2_3.jpg",
      link: ""
    },
    {
      titulo: "Call of Duty®: Black Ops 6",
      precio: "50",
      imagen: "./img//2_3/img_juegos/codbo6_2_3.jpg",
      link: ""
    },
    {
      titulo: "Diablo® IV XBOX LIVE Key",
      precio: "26",
      imagen: "./img/2_3/img_juegos/db4_2_3.jpg",
      link: ""
    }
  ];
function renderizarJuegos(lista) {
  const contenedor = document.getElementById("contenedor-juegos");
  contenedor.innerHTML = "<h2>Todos los juegos</h2>";

  for (let i = 0; i < lista.length; i += 4) {
    const grupo = lista.slice(i, i + 4);
    const seccion = document.createElement("div");
    seccion.className = "pr_jg";

    grupo.forEach((juego, idx) => {
      const realIndex = juegos.indexOf(juego);  
      const tarjeta = document.createElement("div");
      tarjeta.className = "img_jg";
      tarjeta.innerHTML = `
        <img src="${juego.imagen}" alt="${juego.titulo}">
        <h4>${juego.titulo}</h4>
        <p class="precio">${juego.precio} USD</p>
        <button class="comprar" data-titulo="${juego.titulo}">COMPRAR</button>
      `;
      seccion.appendChild(tarjeta);
    });

    contenedor.appendChild(seccion);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarJuegos(juegos);
});

/* 2) —————————————————————————————————————————————————————————————————————————————————————
   BUSCADOR EN PÁGINA
   ————————————————————————————————————————————————————————————————————————————————————— */

const inputBuscador = document.getElementById("buscador");
const contenedorCarruseles = document.getElementById("contenedor-carruseles");

inputBuscador.addEventListener("input", () => {
  const texto = inputBuscador.value.toLowerCase().trim();

  contenedorCarruseles.style.display = texto === "" ? "block" : "none";

  if (texto === "") {
    renderizarJuegos(juegos);
  } else {
    const filtrados = juegos.filter(j => 
      j.titulo.toLowerCase().includes(texto)
    );
    renderizarJuegos(filtrados);
  }
});


/* 3) —————————————————————————————————————————————————————————————————————————————————————
   MODAL GLOBAL 
   ————————————————————————————————————————————————————————————————————————————————————— */
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("comprar")) {
    const titulo = e.target.dataset.titulo;
    const juego = juegos.find(j => j.titulo === titulo);

    if (!juego) return;

    document.getElementById("modalGlobalLabel").textContent = juego.titulo;
    document.getElementById("modalGlobalBody").innerHTML = `¿Deseás comprar este juego por <strong>${juego.precio} USD</strong>?`;
    document.getElementById("modalGlobalLink").href = juego.link || "#";

    const modal = new bootstrap.Modal(document.getElementById("modalGlobal"));
    modal.show();
  }
});


/* —————————————————————————————————————————————————————————————————————————————————————
   FUNCIONES PARA CONSOLA (no se llaman automáticamente)
   Para ejecutar escribir las funciones en la consola
   ————————————————————————————————————————————————————————————————————————————————————— */

const carrito = [];

const codigosDescuento = {
  "GAMER10": 0.10,  
  "SUMMER25": 0.25, 
  "WELCOME15": 0.15 
};

function agregarAlCarrito() {
  let sigue = true;
  while (sigue) {
    const nombre = prompt("¿Qué juego querés agregar?");
    const juego = juegos.find(j => 
      j.titulo.toLowerCase().includes(nombre.toLowerCase())
    );
    if (juego) {
      carrito.push(juego);
      alert(`Agregaste "${juego.titulo}"`);
    } else {
      alert("No existe ese juego");
    }
    sigue = confirm("¿Querés agregar otro?");
  }
  verCarrito(); 
}

function verCarrito() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }
  
  let total = 0;
  let resumen = "Tu carrito:\n\n";
  
  carrito.forEach((j, index) => {
    resumen += `${index + 1}. ${j.titulo}: ${j.precio} USD\n`;
    total += Number(j.precio);
  });
  
  resumen += `\nTotal: ${total} USD`;
  
  const aplicarDesc = confirm(`${resumen}\n\n¿Querés aplicar un código de descuento?`);
  
  if (aplicarDesc) {
    aplicarDescuento(total);
  } else {
    alert(resumen);
  }
}

function eliminarDelCarrito() {
  if (carrito.length === 0) {
    alert("Tu carrito ya está vacío");
    return;
  }

  let lista = "Juegos en tu carrito:\n\n";
  carrito.forEach((juego, index) => {
    lista += `${index + 1}. ${juego.titulo} (${juego.precio} USD)\n`;
  });

  const indiceStr = prompt(`${lista}\n\nIngresá el NÚMERO del juego a eliminar:`);
  const indice = parseInt(indiceStr) - 1;

  if (isNaN(indice) || indice < 0 || indice >= carrito.length) {
    alert("Número inválido. Debe ser un número de la lista.");
  } else {
    const juegoEliminado = carrito.splice(indice, 1)[0];
    alert(`Eliminaste "${juegoEliminado.titulo}" del carrito.`);
    verCarrito(); 
  }
}

function aplicarDescuento() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agregá juegos con agregarAlCarrito()");
    return; 
  }

  const totalOriginal = carrito.reduce((sum, juego) => sum + Number(juego.precio), 0);
  const codigo = prompt("Ingresá tu código de descuento (ej: SUMMER25):").toUpperCase();

  if (codigosDescuento[codigo]) {
    const descuento = codigosDescuento[codigo];
    const totalConDescuento = (totalOriginal * (1 - descuento)).toFixed(2);
    
    alert(`¡Código válido! Descuento del ${descuento * 100}% aplicado.\n\n` +
          `Total original: ${totalOriginal} USD\n` +
          `Descuento: ${descuento * 100}%\n` +
          `Total con descuento: ${totalConDescuento} USD`);
  } else {
    alert("Código no válido. Usá GAMER10, SUMMER25 o WELCOME15.\n\n" +
         `Total sin descuento: ${totalOriginal} USD`);
  }
}

function buscarPorConsola() {
  const termino = prompt("Buscar juego por nombre:");
  const encontrados = juegos.filter(j =>
    j.titulo.toLowerCase().includes(termino.toLowerCase())
  );
  if (encontrados.length) {
    console.log("Resultado de búsqueda:");
    encontrados.forEach(j => console.log(`${j.titulo} — ${j.precio} USD`));
  } else {
    alert("Nada encontrado");
  }
}


function mostrarCatalogoConsola() {
  console.log("Catálogo completo:");
  juegos.forEach((j, i) => console.log(`${i+1}. ${j.titulo} — ${j.precio} USD`));
}



