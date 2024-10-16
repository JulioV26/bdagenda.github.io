/**
 * Función para mostrar la modal de detalles del empleado
 */
async function verDetallesEmpleado(idEmpleado) {
  try {
    // Ocultar la modal si está abierta
    const existingModal = document.getElementById("detalleEmpleadoModal");
    if (existingModal) {
      const modal = bootstrap.Modal.getInstance(existingModal);
      if (modal) {
        modal.hide();
      }
      existingModal.remove(); // Eliminar la modal existente
    }

    // Buscar la Modal de Detalles
    const response = await fetch("modales/modalDetalles.php");
    if (!response.ok) {
      throw new Error("Error al cargar la modal de detalles del empleado");
    }
    // response.text() es un método en programación que se utiliza para obtener el contenido de texto de una respuesta HTTP
    const modalHTML = await response.text();

    // Crear un elemento div para almacenar el contenido de la modal
    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = modalHTML;

    // Agregar la modal al documento actual
    document.body.appendChild(modalContainer);

    // Mostrar la modal
    const myModal = new bootstrap.Modal(
      modalContainer.querySelector("#detalleEmpleadoModal")
    );
    myModal.show();

    await cargarDetalleEmpleado(idEmpleado);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Función para cargar y mostrar los detalles del empleado en la modal
 */
async function cargarDetalleEmpleado(idEmpleado) {
  try {
    const response = await axios.get(
      `acciones/detallesEmpleado.php?id=${idEmpleado}`
    );
    if (response.status === 200) {
      console.log(response.data);
      const { nombre, apaterno, amaterno, genero, fecha_nacimiento, telefono, email, linkedin, avatar } =
        response.data;
      const avatarURL = avatar ? `acciones/fotos_empleados/${avatar}` : null;
      const avatarExistente = avatarURL
        ? await verificarExistenciaImagen(avatarURL)
        : false;
      const avatarHTML = avatarExistente
        ? `<img src="${avatarURL}" alt="Avatar" style="width: 100px; height: 100px; display:block;">`
        : "No disponible";

      // Limpiar el contenido existente de la lista ul

      const ulDetalleEmpleado = document.querySelector(
        "#detalleEmpleadoContenido ul"
      );

      ulDetalleEmpleado.innerHTML = ` 
        <li class="list-group-item"><b>Nombre:</b> 
          ${nombre ? nombre : "No disponible"}
        </li>
        <li class="list-group-item"><b>Apellido Paterno:</b> 
          ${apaterno ? apaterno : "No disponible"}
        </li>
        <li class="list-group-item"><b>Apellido Materno:</b> 
          ${amaterno ? amaterno : "No disponible"}
          </li>
        <li class="list-group-item"><b>Genero:</b>
         ${genero ? genero : "No disponible"}
        </li>
        <li class="list-group-item"><b>Fecha de Nacimiento:</b>
         ${fecha_nacimiento ? fecha_nacimiento : "No disponible"}
        </li>
        <li class="list-group-item"><b>Teléfono:</b> ${
          telefono ? telefono : "No disponible"
        }</li>
        <li class="list-group-item"><b>E-mail:</b> 
          ${email ? email : "No disponible"}
        </li>
        <li class="list-group-item"><b>Linkedin:</b>
         ${linkedin ? linkedin : "No disponible"}
        </li>
         <li class="list-group-item"><b>Avatar:</b> ${avatarHTML}</li>
      `;
    } else {
      alert(`Error al cargar los detalles del empleado con ID ${idEmpleado}`);
    }
  } catch (error) {
    console.error(error);
    alert("Hubo un problema al cargar los detalles del empleado");
  }
}

// Función para verificar la existencia de una imagen
async function verificarExistenciaImagen(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error("Error al verificar la existencia de la imagen:", error);
    return false;
  }
}
