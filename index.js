function enviarPost(data) {
  const url = "https://chat.arpanetos.lol/messages"; // Reemplaza con la URL de tu endpoint de API

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Hubo un problema al enviar el POST.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Respuesta del servidor:", data);
      // Hacer algo con la respuesta del servidor si es necesario
    })
    .catch((error) => {
      console.error("Error al enviar POST:", error);
      // Manejar el error de manera apropiada
    });
}

function obtenerDatosDeAPI() {
  // URL de la API
  const url = "https://chat.arpanetos.lol/messages";
  //
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}

async function generarChat() {
  // Obtener datos de la API
  let lista = [];
  try {
    lista = await obtenerDatosDeAPI();
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  }

  for (let i = lista.length - 1; i >= 0; i--) {
    // Si el mensaje es del usuario, lo muestra a la derecha (estilo azul), de lo contrario, a la izquierda
    let usuarioJulio = lista[i].username === "Julio";
    let colorFondo = usuarioJulio ? "#1A8FE3" : "#eff1f3";
    agregarMensaje(
      lista[i].message,
      lista[i].username,
      lista[i].created_at,
      colorFondo
    );
  }

  // Crear un elemento div para el contenedor del chat
  const chatContainer = document.createElement("div");
  chatContainer.style.width = "98vw";
  chatContainer.style.height = "98vh";
  chatContainer.style.border = "1px solid #ccc";
  chatContainer.style.display = "flex";
  chatContainer.style.flexDirection = "column";
  chatContainer.style.justifyContent = "space-between";
  chatContainer.style.position = "relative";

  // Resto del código para crear la interfaz de usuario

  document.body.appendChild(chatContainer);
}

function agregarMensaje(mensaje, nombreUsuario, fechaHora, colorFondo) {
  let usuarioJulio = nombreUsuario === "Julio";

  // Crear un elemento div para representar el mensaje
  const messageItem = document.createElement("div");
  messageItem.style.borderRadius = "10px";
  messageItem.style.padding = "5px 10px";
  messageItem.style.marginBottom = "10px";
  messageItem.style.wordWrap = "break-word";
  messageItem.style.backgroundColor = colorFondo;

  // Crear elementos para el nombre de usuario, el mensaje y la hora
  const userNameElement = document.createElement("span");
  userNameElement.style.fontWeight = "bold";
  userNameElement.textContent = nombreUsuario;

  const messageElement = document.createElement("div");
  messageElement.textContent = mensaje;

  const timeElement = document.createElement("span");
  timeElement.style.fontSize = "10px";
  timeElement.style.alignSelf = "flex-end";
  timeElement.textContent = fechaHora;

  // Agregar elementos al contenedor del mensaje
  messageItem.appendChild(userNameElement);
  messageItem.appendChild(messageElement);
  messageItem.appendChild(timeElement);

  // Agregar el mensaje al contenedor del chat
  const chatContainer = document.body.querySelector("div");
  chatContainer.appendChild(messageItem);
}

// Llamar a la función para generar el chat cuando se carga la página
generarChat();
