function mostrarMensaje(mensaje, tipo) {
  const coloresIcono = {
    exito: 'rgba(82, 255, 168, 0.8)',
    error: 'rgba(255, 82, 82, 0.8)',
    pregunta: 'rgba(255, 214, 102, 0.9)'
  };

  Swal.fire({
    icon: tipo === 'exito' ? 'success' : tipo === 'pregunta' ? 'question' : 'error',
    title: tipo === 'exito' ? '¡Éxito!' : tipo === 'pregunta' ? '¿Estás seguro?' : 'Error',
    text: mensaje,
    background: 'rgb(13, 32, 51)',
    color: 'white',
    confirmButtonColor: 'rgba(4, 217, 255, 0.71)',
    iconColor: coloresIcono[tipo] || 'white'
  });
}

function limpiarBackdrop() {
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) backdrop.remove();
  document.body.classList.remove('modal-open');
  document.body.style = '';
}