const { ModeloTarea } = require('./tareas.modelo')

const getTareas = async () => {
    const tareas = await ModeloTarea.find().sort({ fecha: 'desc' })
    return tareas
}

const getTarea = async ( id ) => {
    const tarea = await ModeloTarea.findById(id)
    return tarea
}

const postTarea = async ( tarea ) => {
    const respuesta = await ModeloTarea.create(tarea)
    return respuesta
}

const updateTarea = async ( id, tarea ) => {
    await ModeloTarea.findByIdAndUpdate(id, tarea)
    const respuesta = await ModeloTarea.findById(id)

    return respuesta
}

const deleteTarea = async ( id ) => {
    const respuesta = await ModeloTarea.findByIdAndDelete(id)
    return respuesta
}

module.exports = { getTareas, getTarea, postTarea, updateTarea, deleteTarea }