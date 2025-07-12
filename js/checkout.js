function precargarFormulario() {
  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const metodoInput = document.getElementById("metodo");
  const nombreTarjetaInput = document.getElementById("nombreTarjeta");
  const numeroTarjetaInput = document.getElementById("numeroTarjeta");
  const codigoSeguridadInput = document.getElementById("codigoSeguridad");
  const vencimientoInput = document.getElementById("vencimiento");
  const telefonoInput = document.getElementById("telefono");
  const paisInput = document.getElementById("pais");
  const provinciaInput = document.getElementById("provincia");
  const ciudadInput = document.getElementById("ciudad");
  const calleInput = document.getElementById("calle");
  const numeroInput = document.getElementById("numero");
  const codigoPostalInput = document.getElementById("codigoPostal");

  if (!nombreInput.value) nombreInput.value = "Juanceto01";
  if (!emailInput.value) emailInput.value = "juan.s@gmail.com";
  if (!metodoInput.value) metodoInput.value = "tarjeta";
  if (!nombreTarjetaInput.value) nombreTarjetaInput.value = "Juan C. Torres";
  if (!numeroTarjetaInput.value) numeroTarjetaInput.value = "4111111111111111";
  if (!codigoSeguridadInput.value) codigoSeguridadInput.value = "123";
  if (!vencimientoInput.value) vencimientoInput.value = "2025-12";
  if (!telefonoInput.value) telefonoInput.value = "1123456789";
  if (!paisInput.value) paisInput.value = "Argentina";
  if (!provinciaInput.value) provinciaInput.value = "Buenos Aires";
  if (!ciudadInput.value) ciudadInput.value = "CABA";
  if (!calleInput.value) calleInput.value = "Avenida Siempre Viva";
  if (!numeroInput.value) numeroInput.value = "742";
  if (!codigoPostalInput.value) codigoPostalInput.value = "1001";
}

function finalizarCompra() {
  try {
    if (carrito.length === 0) {
      mostrarMensaje('Tu carrito está vacío', 'error');
      return;
    }

    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const metodoInput = document.getElementById("metodo");
    const nombreTarjetaInput = document.getElementById("nombreTarjeta");
    const numeroTarjetaInput = document.getElementById("numeroTarjeta");
    const codigoSeguridadInput = document.getElementById("codigoSeguridad");
    const vencimientoInput = document.getElementById("vencimiento");
    const telefonoInput = document.getElementById("telefono");
    const paisInput = document.getElementById("pais");
    const provinciaInput = document.getElementById("provincia");
    const ciudadInput = document.getElementById("ciudad");
    const calleInput = document.getElementById("calle");
    const numeroInput = document.getElementById("numero");
    const codigoPostalInput = document.getElementById("codigoPostal");

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const metodoTexto = metodoInput.options[metodoInput.selectedIndex].text;
    const nombreTarjeta = nombreTarjetaInput.value.trim();
    const numeroTarjeta = numeroTarjetaInput.value.trim();
    const codigoSeguridad = codigoSeguridadInput.value.trim();
    const vencimiento = vencimientoInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const pais = paisInput.options[paisInput.selectedIndex].text;
    const provincia = provinciaInput.value.trim();
    const ciudad = ciudadInput.value.trim();
    const calle = calleInput.value.trim();
    const numero = numeroInput.value.trim();
    const codigoPostal = codigoPostalInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nombre || !email || !telefono || !pais || !provincia || !ciudad || !calle || !numero || !codigoPostal || !nombreTarjeta || !numeroTarjeta || !codigoSeguridad || !vencimiento) {
      mostrarMensaje("Por favor completá todos los campos", "error");
      return;
    }
    if (!emailRegex.test(email)) {
      mostrarMensaje("Correo electrónico inválido", "error");
      return;
    }
    if (!/^[0-9]{10}$/.test(telefono)) {
      mostrarMensaje("El teléfono debe tener 10 dígitos", "error");
      return;
    }
    if (!/^[0-9]{16}$/.test(numeroTarjeta)) {
      mostrarMensaje("Número de tarjeta inválido (16 dígitos)", "error");
      return;
    }
    if (!/^[0-9]{3}$/.test(codigoSeguridad)) {
      mostrarMensaje("Código de seguridad inválido (3 dígitos)", "error");
      return;
    }
    if (!/^[0-9]{4,6}$/.test(codigoPostal)) {
      mostrarMensaje("Código postal inválido", "error");
      return;
    }

    const subtotal = carrito.reduce((total, item) => total + (Number(item.precio) * (item.cantidad || 1)), 0);
    const total = descuentoActual ? subtotal * (1 - descuentoActual.valor) : subtotal;

    Swal.fire({
      title: '¿Confirmar compra?',
      text: `Total a pagar: $${total.toFixed(2)} USD`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar',
      background: 'rgb(13, 32, 51)',
      color: 'white',
      confirmButtonColor: "rgba(40, 167, 69, 1)",
      cancelButtonColor: 'rgba(255, 82, 82, 0.8)',
      iconColor: 'rgba(255, 214, 102, 0.9)'
    }).then((result) => {
      if (result.isConfirmed) {
        carrito = [];
        descuentoActual = null;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        renderizarCarrito();
        document.getElementById("checkoutPanel").classList.remove("visible");

        Swal.fire({
          icon: "success",
          title: "¡Compra confirmada!",
          html: `
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Dirección:</strong> ${calle} ${numero}, ${ciudad}, ${provincia}, ${pais}, CP ${codigoPostal}</p>
            <p><strong>Método de pago:</strong> ${metodoTexto}</p>
          `,
          confirmButtonColor: "rgba(40, 167, 69, 1)",
          background: 'rgb(13, 32, 51)',
          color: 'white',
          iconColor: 'rgba(82, 255, 168, 0.8)'
        });
      }
    });
  } catch (error) {
    mostrarMensaje("Ocurrió un error inesperado al procesar la compra. Por favor, intentá nuevamente.", "error");
  }
}
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
