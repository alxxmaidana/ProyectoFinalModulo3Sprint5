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

    obtenerDatosFormulario(_condicion) {
        throw new Error("Método 'obtenerData()' no implementado");
    }

    guardarDatosFormulario(_data) {
        throw new Error("Método 'guardarData' no impolementado");
    }

    upsertPais(_filtro, _pais) {
        throw new Error("Método 'upsertPais()' no implementado");
    }

    upsertDocumento(_filtro, _documento) {
        throw new Error("Método 'upsertDocumento()' no implementado");
    }
};

export default IRepository;