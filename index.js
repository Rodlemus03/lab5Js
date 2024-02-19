function generarChat() {
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
    inputField.style.width="100%"
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
    agregarMensaje(mensajeUsuario, true); 
    const mensajeRespuesta = respuestaGenerada(mensajeUsuario); 
    agregarMensaje(mensajeRespuesta, false); 
    inputField.value = ""; 
  });

  function agregarMensaje(mensaje, usuario) {
    // Crear un elemento div para representar el mensaje
    const messageItem = document.createElement("div");
    messageItem.style.borderRadius = "10px";
    messageItem.style.padding = "5px 10px";
    messageItem.style.marginBottom = "10px";
    messageItem.style.wordWrap = "break-word"; 
    messageItem.style.maxWidth = "75%"; 
  
    if (usuario) {
      messageItem.style.marginLeft = "auto";
      messageItem.style.backgroundColor = "#1A8FE3";
      messageItem.textContent = mensaje; 
      messageList.appendChild(messageItem); 
      ajustarAlturaMensaje(messageItem); 
    } else { 
respuestaGenerada(mensaje).then(respuesta => {
  // Crear un elemento div para representar el mensaje de respuesta
  const respuestaItem = document.createElement("div");
  respuestaItem.style.borderRadius = "10px";
  respuestaItem.style.padding = "5px 10px";
  respuestaItem.style.marginBottom = "10px";
  respuestaItem.style.wordWrap = "break-word"; 
  respuestaItem.style.maxWidth = "75%"; 
  respuestaItem.style.backgroundColor = "#eff1f3";
  respuestaItem.style.marginLeft = "2px"; 
  respuestaItem.textContent = respuesta; 
  messageList.appendChild(respuestaItem);
  ajustarAlturaMensaje(respuestaItem); 
});
    }
  }
  

 function ajustarAlturaMensaje(messageItem) {
    const contenidoHeight = messageItem.scrollHeight;

    messageItem.style.height = contenidoHeight + "px";
  }


  function respuestaGenerada(mensajeUsuario) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        //LOGICA
        const respuesta = "Hola mundo";
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
