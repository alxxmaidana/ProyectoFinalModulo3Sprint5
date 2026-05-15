class IRepository {
    cargarPaisesHispanos(_paises) {
        throw new Error("El método 'cargarPaisesHispanohablantes()' no implementado.");
    }

    obtenerTodos() {
        throw new Error("El método 'obtenerTodos()' no implementado.");
    }

    obtenerPorId(_id) {
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
};

export default IRepository;