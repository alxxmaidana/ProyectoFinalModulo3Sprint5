class IRepository {
    obtenerTodos(_filtro) {
        throw new Error("Método 'obtenerTodos()' no implementado.");
    }

    buscarPorId(_id) {
        throw new Error("Método 'obtenerPorId()' no implementado.");
    }

    agregar(_pais) {
        throw new Error("Método 'agregarPais()' no implementado.");
    }

    eliminar(_id) {
        throw new Error("Método 'eliminarPais()' no implementado.");
    }

    editar(_id, _paisActualizado) {
        throw new Error("Método 'editarPais()' no implementado.");
    }

    // Obtener los datos para los formularios (banderasURL, zonasHorarias y subregiones)
    obtenerDatosFormulario(_condicion) {
        throw new Error("Método 'obtenerData()' no implementado");
    }

    // Guardar los datos para los formularios
    guardarDatosFormulario(_data) {
        throw new Error("Método 'guardarData' no impolementado");
    }

    // Método para actualizar/reemplazar un país si ya existe, o agegarlos si no existe.
    upsertPais(_filtro, _pais) {
        throw new Error("Método 'upsertPais()' no implementado");
    }

    // Método para actualizar/reemplazar el documento de datos para formulario si ya existe, o agegarlos si no existe.
    upsertDocumento(_filtro, _documento) {
        throw new Error("Método 'upsertDocumento()' no implementado");
    }

    // Método para verificar si un país ya existe antes de agregarlo
    verificarSiYaExiste(_filtro) {
        throw new Error("Método 'verificarSiYaExiste()' no implementado");
    }
};

export default IRepository;