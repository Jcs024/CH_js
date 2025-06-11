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
      titulo: "God of War Ragnarok (PC) Código de Steam GLOBAL",
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

// Función para renderizar juegos
function renderizarJuegos(lista) {
  const contenedor = document.getElementById("contenedor-juegos");
  if (!contenedor) return;

  contenedor.innerHTML = "<h2>Todos los juegos</h2>";

  for (let i = 0; i < lista.length; i += 4) {
    const grupo = lista.slice(i, i + 4);
    const seccion = document.createElement("div");
    seccion.className = "pr_jg";

    grupo.forEach((juego) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "img_jg";
      tarjeta.innerHTML = `
        <img src="${juego.imagen}" alt="${juego.titulo}">
        <h4>${juego.titulo}</h4>
        <p class="precio">${juego.precio} USD</p>
        <button class="comprar" data-titulo="${juego.titulo}" 
                data-precio="${juego.precio}" 
                data-imagen="${juego.imagen}">COMPRAR</button>
      `;
      seccion.appendChild(tarjeta);
    });

    contenedor.appendChild(seccion);
  }
}
// Función para buscador
const inputBuscador = document.getElementById("buscador");
const contenedorCarruseles = document.getElementById("contenedor-carruseles");

inputBuscador?.addEventListener("input", () => {
  const texto = inputBuscador.value.toLowerCase().trim();

  if (contenedorCarruseles) {
    contenedorCarruseles.style.display = texto === "" ? "block" : "none";
  }

  if (texto === "") {
    renderizarJuegos(juegos);
  } else {
    const filtrados = juegos.filter(j => 
      j.titulo.toLowerCase().includes(texto)
    );
    
    // Buscar también en los carruseles si existen
    if (window.carouseles) {
      window.carouseles.forEach(carrusel => {
        const juegosFiltrados = carrusel.juegos.filter(j => 
          j.titulo.toLowerCase().includes(texto)
        );
        if (juegosFiltrados.length > 0) {
          filtrados.push(...juegosFiltrados.map(j => ({
            titulo: j.titulo,
            precio: j.precio || "0",
            imagen: carrusel.rutaImagen + j.imagen
          })));
        }
      });
    }
    
    renderizarJuegos(filtrados);
  }
});

/* 2) —————————————————————————————————————————————————————————————————————————————————————
   CARRITO Y FUNCIONALIDADES
   ————————————————————————————————————————————————————————————————————————————————————— */
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const codigosDescuento = {
  "GAMER10": 0.10,  
  "SUMMER25": 0.25, 
  "WELCOME15": 0.15 
};

// Elementos del DOM
const carritoIcono = document.querySelector('.carrito-icono');
const carritoContador = document.querySelector('.carrito-contador');
const carritoContainer = document.createElement('div');
carritoContainer.className = 'carrito-container';
document.body.appendChild(carritoContainer);

// Variable para controlar el descuento aplicado
let descuentoActual = null;

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
  carritoContador.textContent = totalItems;
  carritoContador.style.display = totalItems > 0 ? 'block' : 'none';
}

// Función para renderizar el carrito
function renderizarCarrito() {
  carritoContainer.innerHTML = `
    <div class="carrito-header">
      <h2 class="carrito-titulo"><i class="fas fa-shopping-cart"></i> Tu Carrito</h2>
      <button class="carrito-cerrar">&times;</button>
    </div>
    <div class="carrito-body">
      ${carrito.length === 0 ? '<p class="carrito-vacio">Tu carrito está vacío</p>' : ''}
    </div>
  `;

  const carritoBody = carritoContainer.querySelector('.carrito-body');

  if (carrito.length > 0) {
    let subtotal = carrito.reduce((total, item) => total + (Number(item.precio) * (item.cantidad || 1)), 0);
    let total = descuentoActual ? subtotal * (1 - descuentoActual.valor) : subtotal;
    
    // Items del carrito
    carrito.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'carrito-item';
      itemElement.innerHTML = `
        <div class="carrito-item-info">
          <h4>${item.titulo}</h4>
          <div class="carrito-item-controls">
            <div class="carrito-item-cantidad">
              <button class="cantidad-btn menos" data-index="${index}">-</button>
              <span>${item.cantidad || 1}</span>
              <button class="cantidad-btn mas" data-index="${index}">+</button>
            </div>
            <p class="carrito-item-precio">${(Number(item.precio) * (item.cantidad || 1)).toFixed(2)} USD</p>
          </div>
        </div>
        <button class="carrito-item-eliminar" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      `;
      carritoBody.appendChild(itemElement);
    });

    // Sección de descuentos
    const descuentoSection = document.createElement('div');
    descuentoSection.className = 'carrito-descuento-section';
    descuentoSection.innerHTML = `
      <div class="codigos-disponibles">
        <p><i class="fas fa-tag"></i> <strong>Códigos disponibles:</strong> ${Object.keys(codigosDescuento).join(', ')}</p>
      </div>
      <div class="carrito-cupon">
        <input type="text" class="carrito-cupon-input" placeholder="Ingresa código" 
               value="${descuentoActual ? descuentoActual.codigo : ''}">
        <button class="carrito-cupon-boton">Aplicar</button>
      </div>
    `;
    carritoBody.appendChild(descuentoSection);

    // Resumen y total
    const resumenSection = document.createElement('div');
    resumenSection.className = 'carrito-resumen';
    resumenSection.innerHTML = `
      <div class="carrito-totales">
        ${descuentoActual ? `
          <div class="carrito-subtotal">
            <span>Subtotal:</span>
            <span><del>${subtotal.toFixed(2)} USD</del></span>
          </div>
          <div class="carrito-descuento">
            <span>Descuento (${descuentoActual.codigo}):</span>
            <span>-${(descuentoActual.valor * 100)}%</span>
          </div>
        ` : ''}
        <div class="carrito-total">
          <span>Total:</span>
          <span><strong>${total.toFixed(2)} USD</strong></span>
        </div>
      </div>
      <button class="carrito-comprar-btn">
        <i class="fas fa-check-circle"></i> Finalizar Compra
      </button>
    `;
    carritoBody.appendChild(resumenSection);
  }

  // Evento para cerrar el carrito
  document.querySelector('.carrito-cerrar')?.addEventListener('click', () => {
    carritoContainer.classList.remove('visible');
  });

  // Eventos para los items del carrito
  document.querySelectorAll('.carrito-item-eliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderizarCarrito();
      actualizarContadorCarrito();
      mostrarMensaje('Producto eliminado del carrito', 'exito');
    });
  });

  document.querySelectorAll('.cantidad-btn.menos').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
        actualizarContadorCarrito();
      } else {
        mostrarMensaje('La cantidad mínima es 1', 'error');
      }
    });
  });

  document.querySelectorAll('.cantidad-btn.mas').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderizarCarrito();
      actualizarContadorCarrito();
    });
  });

  // Evento para aplicar descuento
  document.querySelector('.carrito-cupon-boton')?.addEventListener('click', aplicarDescuentoDesdeUI);

  // Evento para finalizar compra
  document.querySelector('.carrito-comprar-btn')?.addEventListener('click', finalizarCompra);
}

/* 3) —————————————————————————————————————————————————————————————————————————————————————
   FUNCIONES PRINCIPALES
   ————————————————————————————————————————————————————————————————————————————————————— */
function aplicarDescuentoDesdeUI() {
  const input = document.querySelector('.carrito-cupon-input');
  const codigo = input.value.toUpperCase().trim();
  
  if (carrito.length === 0) {
    mostrarMensaje('Tu carrito está vacío', 'error');
    return;
  }

  if (!codigo) {
    mostrarMensaje('Ingresa un código de descuento', 'error');
    return;
  }

  if (codigosDescuento[codigo]) {
    descuentoActual = {
      codigo: codigo,
      valor: codigosDescuento[codigo]
    };
    mostrarMensaje(`¡Descuento del ${descuentoActual.valor * 100}% aplicado!`, 'exito');
    renderizarCarrito();
  } else {
    descuentoActual = null;
    mostrarMensaje('Código no válido. Usa: ' + Object.keys(codigosDescuento).join(', '), 'error');
    renderizarCarrito();
  }
}

function finalizarCompra() {
  if (carrito.length === 0) {
    mostrarMensaje('Tu carrito está vacío', 'error');
    return;
  }

  const subtotal = carrito.reduce((total, item) => total + (Number(item.precio) * (item.cantidad || 1)), 0);
  const total = descuentoActual ? subtotal * (1 - descuentoActual.valor) : subtotal;
  
  if (confirm(`¿Confirmar compra por ${total.toFixed(2)} USD?`)) {
    carrito = [];
    descuentoActual = null;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    renderizarCarrito();
    mostrarMensaje('¡Compra realizada con éxito!', 'exito');
  }
}

function mostrarMensaje(mensaje, tipo) {
  const alerta = document.createElement('div');
  alerta.className = `alerta ${tipo}`;
  alerta.innerHTML = `
    <i class="fas ${tipo === 'exito' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    ${mensaje}
  `;
  document.body.appendChild(alerta);
  
  setTimeout(() => {
    alerta.remove();
  }, 3000);
}

/* 4) —————————————————————————————————————————————————————————————————————————————————————
   EVENTOS Y MODAL
   ————————————————————————————————————————————————————————————————————————————————————— */
function mostrarModal(juego) {
  const modalElement = document.getElementById("modalGlobal");
  
  // Configurar contenido del modal
  document.getElementById("modalGlobalLabel").textContent = juego.titulo;
  document.getElementById("modalGlobalImage").src = juego.imagen;
  document.getElementById("modalGlobalImage").alt = `Imagen de ${juego.titulo}`;
  document.getElementById("modalGlobalText").textContent = `Precio: ${juego.precio} USD`;
  
  // Configurar botón de agregar
  const addBtn = document.getElementById("modalGlobalAddBtn");
  addBtn.onclick = function() {
    const cantidad = 1;
    
    // Verificar si el juego ya está en el carrito
    const itemExistente = carrito.find(item => item.titulo === juego.titulo);
    if (itemExistente) {
      itemExistente.cantidad = (itemExistente.cantidad || 1) + cantidad;
    } else {
      const juegoParaCarrito = {
        ...juego,
        cantidad: cantidad
      };
      carrito.push(juegoParaCarrito);
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    renderizarCarrito();
    
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    mostrarMensaje('Producto agregado al carrito', 'exito');
  };

  // Mostrar modal
  const modal = new bootstrap.Modal(modalElement);
  
  // Eventos para manejar accesibilidad
  modalElement.addEventListener('shown.bs.modal', () => {
    modalElement.removeAttribute('aria-hidden');
    modalElement.setAttribute('aria-modal', 'true');
  });
  
  modalElement.addEventListener('hidden.bs.modal', () => {
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.removeAttribute('aria-modal');
  });
  
  modal.show();
}

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("comprar")) {
    e.preventDefault();
    
    let juego;
    const elementoBoton = e.target;
    
    // Obtener el título del juego de diferentes maneras según su origen
    let titulo = elementoBoton.dataset.titulo;
    
    // Si no hay título en el dataset, intentar obtenerlo del DOM
    if (!titulo) {
      const tarjeta = elementoBoton.closest(".img_jg, .carousel-caption");
      if (tarjeta) {
        const tituloElement = tarjeta.querySelector("h4, h5");
        if (tituloElement) titulo = tituloElement.textContent;
      }
    }
    
    if (!titulo) {
      console.error("No se pudo obtener el título del juego");
      return;
    }
    
    // Buscar en el catálogo principal
    juego = juegos.find(j => j.titulo === titulo);
    
    // Si no se encuentra en el catálogo principal, buscar en los carruseles
    if (!juego && window.carouseles) {
      for (const carrusel of window.carouseles) {
        const juegoEncontrado = carrusel.juegos.find(j => j.titulo === titulo);
        if (juegoEncontrado) {
          juego = {
            titulo: juegoEncontrado.titulo,
            precio: juegoEncontrado.precio,
            imagen: carrusel.rutaImagen + juegoEncontrado.imagen
          };
          break;
        }
      }
    }
    
    // Si aún no se encuentra, construir el objeto juego desde el DOM
    if (!juego) {
      const tarjeta = elementoBoton.closest(".img_jg");
      if (tarjeta) {
        juego = {
          titulo: titulo,
          precio: tarjeta.querySelector(".precio")?.textContent.replace(" USD", "") || "0",
          imagen: tarjeta.querySelector("img")?.src || ""
        };
      }
    }
    
    if (juego) {
      mostrarModal(juego);
    } else {
      console.error("Juego no encontrado:", titulo);
      mostrarMensaje("No se pudo cargar la información del juego", "error");
    }
  }
});

carritoIcono.addEventListener('click', (e) => {
  e.preventDefault();
  carritoContainer.classList.toggle('visible');
});

/* 5) —————————————————————————————————————————————————————————————————————————————————————
   INICIALIZACIÓN
   ————————————————————————————————————————————————————————————————————————————————————— */
document.addEventListener("DOMContentLoaded", () => {
  carrito = carrito.filter(item => item && item.titulo && item.precio);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  // Renderizar juegos
  renderizarJuegos(juegos);
  
  // Inicializar carrito
  actualizarContadorCarrito();
  renderizarCarrito();
});