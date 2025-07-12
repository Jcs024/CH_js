const contenedor = document.getElementById("contenedor-juegos");
const URL = "../db/juegos.json";
let juegos = [];

function obtenerJuegos() {
  try {
    fetch(URL)
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los juegos");
        return response.json();
      })
      .then((data) => {
        juegos = data;
        renderizarJuegos(juegos);
      })
      .catch((error) => {
        mostrarMensaje("No se pudieron cargar los juegos. Intentalo más tarde.", "error");
      });
  } catch (error) {
    mostrarMensaje("Ocurrió un error inesperado al obtener los juegos.", "error");
  }
}

obtenerJuegos();

function renderizarJuegos(lista) {
  try {
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const titulo = document.createElement("h2");
    titulo.textContent = "Todos los juegos";
    contenedor.appendChild(titulo);

    if (lista.length === 0) {
      const mensaje = document.createElement("p");
      mensaje.className = "sin-resultados";
      mensaje.textContent = "No se encontraron juegos con ese nombre.";
      contenedor.appendChild(mensaje);
      return;
    }

    lista.forEach((juego) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta-juego";

      const imgJg = document.createElement("div");
      imgJg.className = "img_jg";

      const img = document.createElement("img");
      img.src = juego.imagen;
      img.alt = juego.titulo;

      const h4 = document.createElement("h4");
      h4.textContent = juego.titulo;

      const precio = document.createElement("p");
      precio.className = "precio";
      precio.textContent = `${juego.precio} USD`;

      const btn = document.createElement("button");
      btn.className = "btn btn-primary comprar";
      btn.dataset.titulo = juego.titulo;
      btn.dataset.precio = juego.precio;
      btn.dataset.imagen = juego.imagen;
      btn.textContent = "COMPRAR";

      imgJg.appendChild(img);
      imgJg.appendChild(h4);
      imgJg.appendChild(precio);
      imgJg.appendChild(btn);
      tarjeta.appendChild(imgJg);
      contenedor.appendChild(tarjeta);

      btn.addEventListener("click", (e) => {
        try {
          const btn = e.target;
          const juegoSeleccionado = {
            titulo: btn.dataset.titulo,
            precio: btn.dataset.precio,
            imagen: btn.dataset.imagen
          };
          mostrarModal(juegoSeleccionado);
        } catch (error) {
          mostrarMensaje("No se pudo abrir el detalle del juego.", "error");
        }
      });
    });
  } catch (error) {
    mostrarMensaje("Ocurrió un error al mostrar los juegos.", "error");
  }
}