const inputBuscador = document.getElementById("buscador");
const contenedorCarruseles = document.getElementById("contenedor-carruseles");

inputBuscador?.addEventListener("input", () => {
  try {
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

      if (window.carouseles) {
        window.carouseles.forEach(carrusel => {
          const juegosFiltrados = carrusel.juegos.filter(j =>
            j.titulo.toLowerCase().includes(texto)
          );

          juegosFiltrados.forEach(j => {
            if (!filtrados.some(f => f.titulo === j.titulo)) {
              filtrados.push({
                titulo: j.titulo,
                precio: j.precio || "0",
                imagen: carrusel.rutaImagen + j.imagen
              });
            }
          });
        });
      }

      renderizarJuegos(filtrados);
    }
  } catch (error) {
    mostrarMensaje("Ocurrió un error al buscar juegos. Intentá nuevamente.", "error");
  }
});

function mostrarModal(juego) {
  try {
    const modalElement = document.getElementById("modalGlobal");

    document.getElementById("modalGlobalLabel").textContent = juego.titulo;
    document.getElementById("modalGlobalImage").src = juego.imagen;
    document.getElementById("modalGlobalImage").alt = `Imagen de ${juego.titulo}`;
    document.getElementById("modalGlobalText").textContent = `Precio: ${juego.precio} USD`;

    const oldBtn = document.getElementById("modalGlobalAddBtn");
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);

    newBtn.addEventListener("click", () => {
      try {
        const cantidad = 1;
        const itemExistente = carrito.find(item => item.titulo === juego.titulo);
        if (itemExistente) {
          itemExistente.cantidad = (itemExistente.cantidad || 1) + cantidad;
        } else {
          const juegoParaCarrito = { ...juego, cantidad };
          carrito.push(juegoParaCarrito);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        renderizarCarrito();

        document.activeElement.blur();
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        const handler = () => {
          mostrarMensaje('Producto agregado al carrito', 'exito');
          limpiarBackdrop();
          modalElement.removeEventListener('hidden.bs.modal', handler);
        };
        modalElement.addEventListener('hidden.bs.modal', handler);
      } catch (error) {
        mostrarMensaje("No se pudo agregar el producto al carrito.", "error");
      }
    });

    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    modalElement.addEventListener('hidden.bs.modal', () => {
      limpiarBackdrop();
    });
  } catch (error) {
    mostrarMensaje("No se pudo mostrar el detalle del juego.", "error");
  }
}


document.addEventListener("click", function (e) {
  try {
    if (e.target.classList.contains("comprar")) {
      e.preventDefault();

      let juego;
      const elementoBoton = e.target;
      let titulo = elementoBoton.dataset.titulo;

      if (!titulo) {
        const tarjeta = elementoBoton.closest(".img_jg, .carousel-caption");
        const tituloElement = tarjeta?.querySelector("h4, h5");
        titulo = tituloElement?.textContent;
      }

      juego = juegos.find(j => j.titulo === titulo);

      if (!juego && window.carouseles) {
        window.carouseles.some(carrusel => {
          const juegoEncontrado = carrusel.juegos.find(j => j.titulo === titulo);
          if (juegoEncontrado) {
            juego = {
              titulo: juegoEncontrado.titulo,
              precio: juegoEncontrado.precio,
              imagen: carrusel.rutaImagen + juegoEncontrado.imagen
            };
            return true;
          }
          return false;
        });
      }

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
        mostrarMensaje("No se pudo cargar la información del juego", "error");
      }
    }
  } catch (error) {
    mostrarMensaje("Ocurrió un error al intentar mostrar el juego.", "error");
  }
});


carritoIcono.addEventListener('click', (e) => {
  e.preventDefault();
  carritoContainer.classList.toggle('visible');
});

carrito = carrito.filter(item => item && item.titulo && item.precio);
localStorage.setItem('carrito', JSON.stringify(carrito));

if (typeof juegos !== 'undefined' && juegos.length > 0) {
  renderizarJuegos(juegos);
}

actualizarContadorCarrito();
renderizarCarrito();

carritoContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("carrito-comprar-btn")) {
    document.getElementById("checkoutPanel").classList.add("visible");
    precargarFormulario(); 
  }
});

document.getElementById("cerrarCheckout").addEventListener("click", () => {
  document.getElementById("checkoutPanel").classList.remove("visible");
});

document.getElementById("cancelarCheckout").addEventListener("click", () => {
  document.getElementById("checkoutPanel").classList.remove("visible");
});

document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  finalizarCompra();
});

