function obtenerDatosDeAPI() {
  // URL de la API
  const url = "https://chat.arpanetos.lol/messages";

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
    console.log(lista); // Asegúrate de que la lista se haya cargado correctamente
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  }

  for (let i = 0; i < lista.length; i++) {
    // Si el mensaje es del usuario, lo muestra a la derecha (estilo azul), de lo contrario, a la izquierda
    agregarMensaje(
      lista[i].message,
      false,
      lista[i].username,
      lista[i].created_at
    );
  }

  //END API

  // Crear un elemento div para el contenedor del chat
  const chatContainer = document.createElement("div");
  chatContainer.style.width = "98vw";
  chatContainer.style.height = "98vh";
  chatContainer.style.border = "1px solid #ccc";
  chatContainer.style.display = "flex";
  chatContainer.style.flexDirection = "column";
  chatContainer.style.justifyContent = "space-between";
  chatContainer.style.position = "relative";

  // Crear un elemento div para la lista de mensajes
  const messageList = document.createElement("div");
  messageList.style.overflowY = "scroll";
  messageList.style.padding = "10px";
  messageList.style.marginBottom = "10px";
  messageList.style.flexGrow = "1";

  // Crear un elemento div para la barra de ingreso de mensaje
  const inputBar = document.createElement("div");
  inputBar.style.height = "50px";
  inputBar.style.backgroundColor = "#f2f2f2";
  inputBar.style.display = "flex";
  inputBar.style.alignItems = "center";
  inputBar.style.padding = "0 10px";

  // Crear un elemento input para el campo de ingreso de mensaje
  const inputField = document.createElement("input");
  inputField.style.height = "80%";
  inputField.style.width = "100%";
  inputField.style.marginLeft = "0px";
  inputField.style.border = "1px solid #ccc";
  inputField.style.borderRadius = "5px";
  inputField.style.padding = "5px";

  // Crear un botón para alternar el modo oscuro
  const darkModeButton = document.createElement("button");
  darkModeButton.textContent = "Modo Oscuro";
  darkModeButton.style.marginLeft = "10px";
  darkModeButton.style.padding = "5px 10px";
  darkModeButton.style.border = "none";
  darkModeButton.style.borderRadius = "5px";
  darkModeButton.style.backgroundColor = "#333";
  darkModeButton.style.color = "#fff";
  darkModeButton.style.cursor = "pointer";

  // Bandera para el modo oscuro
  let isDarkMode = false;

  // Agregar un evento click para alternar el modo oscuro
  darkModeButton.addEventListener("click", function () {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      chatContainer.style.backgroundColor = "#333";
      darkModeButton.textContent = "Modo Claro";
    } else {
      chatContainer.style.backgroundColor = "#fff";
      darkModeButton.textContent = "Modo Oscuro";
    }
  });

  // Crear un elemento para el contador de caracteres
  const characterCount = document.createElement("span");
  characterCount.textContent = "0/140";
  characterCount.style.marginLeft = "10px";
  inputBar.appendChild(characterCount);

  inputField.addEventListener("input", function () {
    const characterLength = inputField.value.length;
    characterCount.textContent = characterLength + "/140";
    if (characterLength > 139) {
      inputField.value = inputField.value.slice(0, 139);
    }
  });

  // Crear un botón para enviar el mensaje
  const sendButton = document.createElement("button");
  sendButton.textContent = "Enviar";
  sendButton.style.height = "100%";
  sendButton.style.marginLeft = "50px";
  sendButton.style.padding = "5px 10px";
  sendButton.style.border = "none";
  sendButton.style.borderRadius = "5px";
  sendButton.style.backgroundColor = "#007bff";
  sendButton.style.color = "#fff";
  sendButton.style.cursor = "pointer";

  sendButton.addEventListener("click", function () {
    const mensajeUsuario = inputField.value;
    const ahora=new Date();
    const horaActual=ahora.toLocaleTimeString();
    agregarMensaje(mensajeUsuario, true,"Julio",horaActual);
    inputField.value = "";
  });

  function agregarMensaje(mensaje, usuarioBandera, nombreUsuario, fechaHora) {
    // Crear un elemento div para representar el mensaje
    const messageItem = document.createElement("div");
    messageItem.style.borderRadius = "10px";
    messageItem.style.padding = "5px 10px";
    messageItem.style.marginBottom = "10px";
    messageItem.style.wordWrap = "break-word";

    if (usuarioBandera) {
  // Crear un contenedor para el mensaje del usuario
  const userMessageContainer = document.createElement("div");
  userMessageContainer.style.marginLeft = "auto";
  userMessageContainer.style.marginBottom = "10px";
  userMessageContainer.style.display = "flex";
  userMessageContainer.style.width="75%"

  userMessageContainer.style.flexDirection = "column";

  // Crear un elemento para el nombre de usuario 
  const userNameElement = document.createElement("span");
  userNameElement.style.fontWeight = "bold";
  userNameElement.textContent = nombreUsuario;

  // Crear un elemento para el mensaje del usuario
  const userMessageElement = document.createElement("div");
  userMessageElement.style.borderRadius = "10px";
  userMessageElement.style.padding = "5px 10px";
  userMessageElement.style.wordWrap = "break-word";
  userMessageElement.style.backgroundColor = "#1A8FE3";
  userMessageElement.textContent = mensaje;

  // Crear un elemento para la hora
  const userTimeElement = document.createElement("span");
  userTimeElement.style.fontSize = "10px";
  userTimeElement.style.alignSelf = "flex-end";
  userTimeElement.textContent = fechaHora;

  // Añadir elementos al contenedor del mensaje del usuario
  userMessageContainer.appendChild(userNameElement);
  userMessageContainer.appendChild(userMessageElement);
  userMessageContainer.appendChild(userTimeElement);

  // Añadir el contenedor del mensaje del usuario a la lista de mensajes
  messageList.appendChild(userMessageContainer);
  ajustarAlturaMensaje(userMessageContainer);
  messageList.scrollTop = messageList.scrollHeight;

    } else {
      respuestaGenerada(mensaje, nombreUsuario, fechaHora).then((respuesta) => {
        // Crear un contenedor para la respuesta
        const respuestaContainer = document.createElement("div");
        respuestaContainer.style.marginBottom = "10px";
        respuestaContainer.style.display = "flex";
        respuestaContainer.style.width="75%"
        respuestaContainer.style.flexDirection = "column";

        // Crear un elemento para el nombre de usuario 
        const NameElement = document.createElement("span");
        NameElement.style.fontWeight = "bold";
        NameElement.textContent = nombreUsuario;

        // Crear un elemento para la respuesta
        const respuestaElement = document.createElement("div");
        respuestaElement.style.borderRadius = "10px";
        respuestaElement.style.padding = "5px 10px";
        respuestaElement.style.wordWrap = "break-word";
        respuestaElement.style.backgroundColor = "#eff1f3";
        respuestaElement.textContent = respuesta;

        // Crear un elemento para la hora
        const timeElement = document.createElement("span");
        timeElement.style.fontSize = "10px";
        timeElement.style.alignSelf = "flex-end";
        timeElement.textContent = fechaHora;

        // Añadir elementos al contenedor de la respuesta
        respuestaContainer.appendChild(NameElement);
        respuestaContainer.appendChild(respuestaElement);
        respuestaContainer.appendChild(timeElement);

        // Añadir el contenedor de la respuesta a la lista de mensajes
        messageList.appendChild(respuestaContainer);
        ajustarAlturaMensaje(respuestaContainer);
        messageList.scrollTop = messageList.scrollHeight;
      });
    }

  }

  function ajustarAlturaMensaje(messageItem) {
    const contenidoHeight = messageItem.scrollHeight;

    messageItem.style.height = contenidoHeight + "px";
  }

  function respuestaGenerada(mensajeUsuario, fecha) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //LOGICA
        const respuesta = mensajeUsuario
        //LOGICA
        resolve(respuesta);
      }, 2000);
    });
  }

  inputBar.appendChild(inputField);
  inputBar.appendChild(sendButton);
  chatContainer.appendChild(messageList);
  chatContainer.appendChild(inputBar);
  inputBar.appendChild(darkModeButton);

  document.body.appendChild(chatContainer);
}
