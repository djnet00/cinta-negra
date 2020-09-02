const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { ModeloUsuario } = require('./usuarios.modelo')
const { ModeloTarea } = require('../tareas/tareas.modelo')
const { respuesta } = require('../../utilidades/respuesta')


const usuariosControlador = {
    getUsuarios : async(req, res)=>{
        try {
            const usuarios = await ModeloUsuario.find({es_activo: true}).exec()
            respuesta.success(req, res, 200, usuarios)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error al buscar usuarios')
        }
    },

    getUsuario: async(req, res)=>{
        const _id = req.params.id
        try {
            const usuario = await ModeloUsuario.findOne({_id, es_activo: true})
            respuesta.success(req, res, 200, usuario)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error al buscar un usuario')
        }
    },
    postUsuario: async ( req, res ) =>{
        const usuario = req.body
        try {
            const usuarioCreado = await ModeloUsuario.create(usuario)
            respuesta.success(req, res, 201, usuarioCreado)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error al crear el usuario')
        }
    },
    updateUsuario: async (req, res)=>{
        const _id = req.params.id
        const usuarioParaActualizar = req.body
        try {
            const usuarioActualizado = await ModeloUsuario.findByIdAndUpdate(_id, usuarioParaActualizar,{new: true})
            respuesta.success(req, res, 200, usuarioActualizado)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error al actualizar usuario')
        }
    },
    deleteUsuario:async (req, res)=>{
        const _id = req.params.id
        try {
            const usuarioEliminado = await ModeloUsuario.findByIdAndUpdate(_id, {es_activo: false},{new: true})
            respuesta.success(req, res, 200, usuarioEliminado)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error al eliminar usuario')
        }
    },
    //CRUD interaccion tareas
    getUsuariosTareas : async(req, res)=>{
        const _id = req.params.idUsuario
        try {
            const usuario = await ModeloUsuario.findById({_id}).populate('tareas', {es_activo: true})
            const { tareas } = usuario
            respuesta.success(req, res, 200, tareas)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error al buscar las tareas de usuario')
        }
    },
    getUsuarioTarea : async(req,res )=>{
        const idUsuario = req.params.idUsuario
        const idTarea = req.params.idTarea
        try {
            const Usuario = await ModeloUsuario.findOne({_id: idUsuario}).populate('tareas', {es_activo: true})
            const { tareas } = Usuario
            const [tarea] = tareas.filter(tarea => tarea._id == idTarea)
            respuesta.success(req, res, 200, tarea)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error al consultar la tarea de usuario')
        }
    },
    postUsuarioTarea : async(req, res)=>{
        const _id = req.params.idUsuario
        const tareaUsuario = req.body
        const tareaCrear = {...tareaUsuario, usuario: _id } //operador spread js
        try {
            const Usuario = await ModeloUsuario.findOne({_id,es_activo: true})
            console.log('MODELO',Usuario)
            const tareaCreada = await ModeloTarea.create(tareaCrear)
            Usuario.tareas.push(tareaCreada._id)
            await Usuario.save()
            respuesta.success(req, res, 201, tareaCreada)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error al crear la tarea de usuario')
        }
    },
    updateUsuarioTarea : async(req, res)=>{
        const idUsuario = req.params.idUsuario
        const idTarea = req.params.idTarea
        const tareaNueva = req.body
        try {
            const tareaActualizada = await ModeloTarea.findByIdAndUpdate({_id: idTarea, usuario: idUsuario, es_activo: true },tareaNueva, {new: true})
            respuesta.success(req, res, 201, tareaActualizada)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error al actualizar la tarea')
        }
    },
    deleteUsuarioTarea : async(req, res)=>{
        const {idUsuario, idTarea} = req.params
        try {
            const Usuario = await ModeloUsuario.findOne({_id: idUsuario,es_activo: true})
            if(!Usuario)return respuesta.error(req, res, 400, 'Error usuario no encontrado')
            const Tarea = await ModeloTarea.findOne({_id: idTarea, es_activo: true})
            if(!Tarea)return respuesta.error(req, res, 400, 'Error tarea no encontrada')
            if(Tarea.usuario.toString() !== idUsuario.toString() ) return respuesta.error(req, res, 400, 'Error la tarea no es del usuario')
            Tarea.es_activo = false
            await Tarea.save()
            respuesta.success(req, res, 200, Tarea)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error al eliminar la tarea')
        }
    },
    //rutas auth
    signup : async ( req, res ) =>{
        const usuario = req.body
        try {
            const usuarioCreado = await ModeloUsuario.create(usuario)
            respuesta.success(req, res, 201, usuarioCreado)
        } catch (error) {
            respuesta.error(req, res, 400, 'Error al hacer signup')
        }
    },
    login : async(req, res )=>{
        const { email, password } = req.body
        
        try {
            const Usuario = await ModeloUsuario.findOne({email, es_activo: true})
            if(!Usuario) return respuesta.error(req, res, 400, 'Error usuario no encontrado')
            
            const esValidaLaPassword = bcrypt.compareSync(password, Usuario.password)
            if(!esValidaLaPassword) return respuesta.error(req, res, 400, 'Error credenciales invalidas')
            
            const token = jwt.sign({_id: Usuario._id} ,process.env.SECRET_JWT,{ expiresIn: '1d' })
            
            respuesta.success(req, res, 200, token)
        } catch (error) {
            respuesta.error(req,res, 400,'Error al hacer login')
        }
    }
}
module.exports = {usuariosControlador}