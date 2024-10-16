<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include("../config/config.php");

    $id = trim($_POST['id']); // Asegúrate de recibir el ID del empleado que se actualizará
    $nombre = trim($_POST['nombre']);
    $apaterno = trim($_POST['apaterno']);
    $amaterno = trim($_POST['amaterno']);
    $genero = trim($_POST['genero']);
    $fecha_nacimiento = trim($_POST['fecha_nacimiento']);
    $telefono = trim($_POST['telefono']);
    $email = trim($_POST['email']);
    $linkedin = trim($_POST['linkedin']);

    $avatar = null;

    // Verifica si se ha subido un nuevo archivo de avatar
    if (isset($_FILES['avatar']) && $_FILES['avatar']['size'] > 0) {
        $archivoTemporal = $_FILES['avatar']['tmp_name'];
        $nombreArchivo = $_FILES['avatar']['name'];

        $extension = strtolower(pathinfo($nombreArchivo, PATHINFO_EXTENSION));

        // Genera un nombre único y seguro para el archivo
        $dirLocal = "fotos_empleados";
        $nombreArchivo = substr(md5(uniqid(rand())), 0, 10) . "." . $extension;
        $rutaDestino = $dirLocal . '/' . $nombreArchivo;

        if (move_uploaded_file($archivoTemporal, $rutaDestino)) {
            $avatar = $nombreArchivo;
        }
    }

    // Actualiza los datos en la base de datos
    $sql = "UPDATE tbl_agenda 
            SET nombre='$nombre', apaterno='$apaterno', amaterno='$amaterno', genero='$genero', fecha_nacimiento='$fecha_nacimiento', telefono='$telefono', email='$email',  linkedin='$linkedin'";

    // Si hay un nuevo avatar, actualiza su valor
    if ($avatar !== null) {
        $sql .= ", avatar='$avatar'";
    }

    $sql .= " WHERE id='$id'";

    if ($conexion->query($sql) === TRUE) {
        header("location:../");
    } else {
        echo "Error al actualizar el registro: " . $conexion->error;
    }
}
