const { ModeloTarea } = require('./tareas.modelo')
const {respuesta} = require('../../utilidades/respuesta')


const tareasControlador = {
    getTareas : async(req, res)=>{
        try {
            const tareas = await ModeloTarea.find()
            if(!tareas) return respuesta.error(req, res, 400, 'No hay ninguna tarea')
            respuesta.success(req, res, 200, tareas)
        } catch (error) {
            respuesta.error(req,res,400,'Error al consultar las tareas')
        }
    },
    getTarea : async(req, res)=>{
        const _id = req.params.idTarea
        try {
            const tarea = await ModeloTarea.find(_id).exec()
            if(!tarea) return respuesta.error(req,res,400,'No hay tarea')
            respuesta.success(req, res, 200, tarea)
        } catch (error) {
            respuesta.error(req, res, 400,'Error al consultar la tarea')
        }
    },
    postTarea : async ( req, res ) =>{
        const tarea = req.body
        try {
            const tareaCreada = await ModeloTarea.create(tarea)
            if(!tareaCreada) return respuesta.error(req,res,400,'Error al crear tarea')
            respuesta.success(req, res, 201, tareaCreada)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error durante la creacion de la tarea')
        }
    },
    updateTarea : async (req, res )=>{
        const _id = req.params.idTarea
        try {
            const tareaActualizada = await ModeloTarea.findByIdAndUpdate(_id, tareaParaActualizar,{new: true})
            if(!tareaActualizada) return respuesta.error(req, res, 400, 'Error al actualizar la tarea')
            respuesta.success(req, res, 200, tareaActualizada)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error durante la actualizacion de la tarea')
        }
    },
    deleteTarea:  async (req, res)=>{
        const _id = req.params.idTarea
        try {
            const tareaEliminada = await ModeloTarea.findByIdAndDelete(_id)
            if(!tareaEliminada) return respuesta.error(req, res, 400, 'Error al eliminar la tarea')
            respuesta.success(req, res, 200,tareaEliminada)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error durante la eliminacion de la tarea')
        }
    }
}


module.exports = { tareasControlador }