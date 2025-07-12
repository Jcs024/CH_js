let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const codigosDescuento = {
  "GAMER10": 0.10,
  "SUMMER25": 0.25,
  "WELCOME15": 0.15
};

const carritoIcono = document.querySelector('.carrito-icono');
const carritoContador = document.querySelector('.carrito-contador');
const carritoContainer = document.createElement('div');
carritoContainer.className = 'carrito-container';
document.body.appendChild(carritoContainer);

let descuentoActual = null;

function actualizarContadorCarrito() {
  try {
    const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    carritoContador.innerHTML = totalItems;
    carritoContador.style.display = totalItems > 0 ? 'block' : 'none';
  } catch (error) {
    mostrarMensaje("No se pudo actualizar el contador del carrito.", "error");
  }
}

function renderizarCarrito() {
  try {
    carritoContainer.innerHTML = "";

    const header = document.createElement("div");
    header.className = "carrito-header";

    const titulo = document.createElement("h2");
    titulo.className = "carrito-titulo";
    const icono = document.createElement("i");
    icono.className = "fas fa-shopping-cart";
    titulo.appendChild(icono);
    titulo.append(" Tu Carrito");

    const cerrarBtn = document.createElement("button");
    cerrarBtn.className = "carrito-cerrar";
    cerrarBtn.innerHTML = "&times;";

    header.appendChild(titulo);
    header.appendChild(cerrarBtn);
    carritoContainer.appendChild(header);

    const body = document.createElement("div");
    body.className = "carrito-body";
    carritoContainer.appendChild(body);

    if (carrito.length === 0) {
      const vacio = document.createElement("p");
      vacio.className = "carrito-vacio";
      vacio.textContent = "Tu carrito está vacío";
      body.appendChild(vacio);
      return;
    }

    let subtotal = carrito.reduce((total, item) => total + (Number(item.precio) * (item.cantidad || 1)), 0);
    let total = descuentoActual ? subtotal * (1 - descuentoActual.valor) : subtotal;

    carrito.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.className = "carrito-item";

      const info = document.createElement("div");
      info.className = "carrito-item-info";

      const h4 = document.createElement("h4");
      h4.textContent = item.titulo;

      const controls = document.createElement("div");
      controls.className = "carrito-item-controls";

      const cantidadDiv = document.createElement("div");
      cantidadDiv.className = "carrito-item-cantidad";

      const btnMenos = document.createElement("button");
      btnMenos.className = "cantidad-btn menos";
      btnMenos.dataset.index = index;
      btnMenos.textContent = "-";

      const spanCantidad = document.createElement("span");
      spanCantidad.textContent = item.cantidad || 1;

      const btnMas = document.createElement("button");
      btnMas.className = "cantidad-btn mas";
      btnMas.dataset.index = index;
      btnMas.textContent = "+";

      cantidadDiv.appendChild(btnMenos);
      cantidadDiv.appendChild(spanCantidad);
      cantidadDiv.appendChild(btnMas);

      const precio = document.createElement("p");
      precio.className = "carrito-item-precio";
      precio.textContent = `${(Number(item.precio) * (item.cantidad || 1)).toFixed(2)} USD`;

      controls.appendChild(cantidadDiv);
      controls.appendChild(precio);

      info.appendChild(h4);
      info.appendChild(controls);

      const eliminarBtn = document.createElement("button");
      eliminarBtn.className = "carrito-item-eliminar";
      eliminarBtn.dataset.index = index;
      const iconTrash = document.createElement("i");
      iconTrash.className = "fas fa-trash";
      eliminarBtn.appendChild(iconTrash);

      itemElement.appendChild(info);
      itemElement.appendChild(eliminarBtn);
      body.appendChild(itemElement);
    });

    // Sección de descuento
    const descuentoSection = document.createElement("div");
    descuentoSection.className = "carrito-descuento-section";

    const codigosDiv = document.createElement("div");
    codigosDiv.className = "codigos-disponibles";

    const codigosP = document.createElement("p");
    const tagIcon = document.createElement("i");
    tagIcon.className = "fas fa-tag";
    codigosP.appendChild(tagIcon);
    const strong = document.createElement("strong");
    strong.textContent = " Códigos disponibles:";
    codigosP.append(" ");
    codigosP.appendChild(strong);
    codigosP.append(" " + Object.keys(codigosDescuento).join(", "));
    codigosDiv.appendChild(codigosP);

    const cuponDiv = document.createElement("div");
    cuponDiv.className = "carrito-cupon";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "carrito-cupon-input";
    input.placeholder = "Ingresa código";
    input.value = descuentoActual ? descuentoActual.codigo : "";

    const boton = document.createElement("button");
    boton.className = "carrito-cupon-boton";
    boton.textContent = "Aplicar";

    cuponDiv.appendChild(input);
    cuponDiv.appendChild(boton);

    descuentoSection.appendChild(codigosDiv);
    descuentoSection.appendChild(cuponDiv);
    body.appendChild(descuentoSection);

    // Resumen
    const resumenSection = document.createElement("div");
    resumenSection.className = "carrito-resumen";

    const resumenTotales = document.createElement("div");
    resumenTotales.className = "carrito-totales";

    if (descuentoActual) {
      const subtotalDiv = document.createElement("div");
      subtotalDiv.className = "carrito-subtotal";
      subtotalDiv.innerHTML = `<span>Subtotal:</span><span><del>${subtotal.toFixed(2)} USD</del></span>`;
      resumenTotales.appendChild(subtotalDiv);

      const descuentoDiv = document.createElement("div");
      descuentoDiv.className = "carrito-descuento";
      descuentoDiv.innerHTML = `<span>Descuento (${descuentoActual.codigo}):</span><span>-${(descuentoActual.valor * 100)}%</span>`;
      resumenTotales.appendChild(descuentoDiv);
    }

    const totalDiv = document.createElement("div");
    totalDiv.className = "carrito-total";
    totalDiv.innerHTML = `<span>Total:</span><span><strong>${total.toFixed(2)} USD</strong></span>`;
    resumenTotales.appendChild(totalDiv);

    const comprarBtn = document.createElement("button");
    comprarBtn.className = "carrito-comprar-btn btn btn-success";
    comprarBtn.innerHTML = `<i class="fas fa-check-circle"></i> Finalizar Compra`;

    resumenSection.appendChild(resumenTotales);
    resumenSection.appendChild(comprarBtn);
    body.appendChild(resumenSection);

    // Botón vaciar
    const vaciarBtn = document.createElement("button");
    vaciarBtn.className = "carrito-vaciar-btn btn btn-danger mt-2";
    const iconTrash = document.createElement("i");
    iconTrash.className = "fas fa-trash-alt";
    vaciarBtn.appendChild(iconTrash);
    vaciarBtn.append(" Vaciar Carrito");
    vaciarBtn.addEventListener("click", () => {
      carrito = [];
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContadorCarrito();
      renderizarCarrito();
      mostrarMensaje("Carrito vaciado", "exito");
    });
    body.appendChild(vaciarBtn);

    // Eventos
    carritoContainer.addEventListener("click", (e) => {
      const botonCompra = e.target.closest(".carrito-comprar-btn");
      if (botonCompra) {
        document.getElementById("checkoutPanel").classList.add("visible");
      }
    });

    body.querySelectorAll('.carrito-item-eliminar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.currentTarget.dataset.index;
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
        actualizarContadorCarrito();
        mostrarMensaje('Producto eliminado del carrito', 'exito');
      });
    });

    body.querySelectorAll('.cantidad-btn.menos').forEach(btn => {
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

    body.querySelectorAll('.cantidad-btn.mas').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.currentTarget.dataset.index;
        carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
        actualizarContadorCarrito();
      });
    });

    body.querySelector('.carrito-cupon-boton')?.addEventListener('click', aplicarDescuentoDesdeUI);

  } catch (error) {
    mostrarMensaje("Ocurrió un error al mostrar el carrito.", "error");
  }
}


carritoContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("carrito-cerrar") || e.target.closest(".carrito-cerrar")) {
      carritoContainer.classList.remove("visible");
    }
});

function agregarAlCarrito(juego) {
  try {
    const itemExistente = carrito.find(item => item.titulo === juego.titulo);
    if (itemExistente) {
      itemExistente.cantidad = (itemExistente.cantidad || 1) + 1;
    } else {
      juego.cantidad = 1;
      carrito.push(juego);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    renderizarCarrito();
    mostrarMensaje('Producto agregado al carrito', 'exito');
  } catch (error) {
    mostrarMensaje("No se pudo agregar el producto al carrito.", "error");
  }
}
