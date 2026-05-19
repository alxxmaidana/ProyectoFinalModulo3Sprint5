class IRepository {
    cargarPaisesHispanos(_paises) {
        throw new Error("El método 'cargarPaisesHispanohablantes()' no implementado.");
    }

    obtenerTodos(_filtro) {
        throw new Error("El método 'obtenerTodos()' no implementado.");
    }

    buscarPorId(_id) {
        throw new Error("El método 'obtenerPorId()' no implementado.");
    }

    agregar(_pais) {
        throw new Error("El método 'agregarPais()' no implementado.");
    }

    eliminar(_id) {
        throw new Error("El método 'eliminarPais()' no implementado.");
    }

    editar(_id, _paisActualizado) {
        throw new Error("El método 'editarPais()' no implementado.");
    }

    obtenerData(_condicion) {
        throw new Error("El método 'obtenerData()' no implementado");
    }

    guardarData(_data) {
        throw new Error("El método 'guardarData' no impolementado");
    }
};

export default IRepository;