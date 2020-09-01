const Bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { UserModel } = require('./users.modelo')
const { ModeloTarea } = require('../tareas/tareas.modelo')
const { response } = require('../../utils/response')

const getUsers  = async(req, res)=>{
    try {
        const usuarios = await UserModel.find({is_active: true}).exec()
        response.success(req, res, 200, usuarios)
    } catch (error) {
        response.error(req, res, 400, 'Error al buscar usuarios')
    }
}

const getUser = async(req, res)=>{
    const _id = req.params.id
    try {
        const usuario = await UserModel.findOne({_id, is_active: true})
        response.success(req, res, 200, usuario)
    } catch (error) {
        response.error(req, res, 400, 'Error al buscar un usuario')
    }
}

const postUser = async ( req, res ) =>{
    const usuario = req.body

    try {
        const usuarioCreado = await UserModel.create(usuario)
        response.success(req, res, 201, usuarioCreado)
    } catch (error) {
        response.error(req, res, 400, 'Error al crear el usuario')
    }
}

const updateUser = async (req, res)=>{
    const _id = req.params.id
    const usuarioParaActualizar = req.body

    try {
        const usuarioActualizado = await UserModel.findByIdAndUpdate(_id, usuarioParaActualizar, {new: true})
        response.success(req, res, 200, usuarioActualizado)
    } catch (error) {
        response.error(req, res, 400, 'Error al actualizar usuario')
    }
}

const deleteUser = async (req, res)=>{
    const _id = req.params.id

    try {
        const usuarioEliminado = await UserModel.findByIdAndUpdate(_id, {is_active: false},{new: true})
        response.success(req, res, 200, usuarioEliminado)
    } catch (error) {
        response.error(req, res, 400, 'Error al eliminar usuario')
    }
}

//CRUD interaccion tareas
const getUsersTareas = async(req, res)=>{
    const _id = req.params.idUser

    try {
        const usuario = await UserModel.findById({_id}).populate('tareas')
        const { tareas } = usuario
        response.success(req, res, 200, tareas)
    } catch (error) {
        response.error(req, res, 400, 'Error al buscar las tareas de usuario')
    }
}

const getUserTarea = async(req,res )=>{
    const idUser = req.params.idUser
    const idTarea = req.params.idTarea

    try {
        const usuario = await UserModel.findOne({_id: idUser}).populate('tareas')
        const { tareas } = usuario
        const [tarea] = tareas.filter(e => e._id == idTarea)
        response.success(req, res, 200, tarea)
    } catch (error) {
        response.error(req, res, 400, 'Error al consultar la tarea de usuario')
    }
}

const postUserTarea = async(req, res)=>{
    const _id = req.params.idUser
    const tareaUser = req.body
    const tareaCrear = {...tareaUser, usuario: _id } //operador spread js

    try {
        const User = await UserModel.findOne({_id,is_active: true})
        console.log('MODELO',User)
        const tareaCreada = await ModeloTarea.create(tareaCrear)
        User.tareas.push(tareaCreada._id)
        await User.save()
        response.success(req, res, 201, tareaCreada)
    } catch (error) {
        response.error(req, res, 400, 'Error al crear la tarea de usuario')
    }
}

const updateUserTarea = async(req, res)=>{
    const idUser = req.params.idUser
    const idTarea = req.params.idTarea
    const tareaNueva = req.body

    try {
        const tareaActualizada = await ModeloTarea.findByIdAndUpdate({_id: idTarea, usuario: idUser, is_active: true },tareaNueva, {new: true})
        response.success(req, res, 201, tareaActualizada)
    } catch (error) {
        response.error(req, res, 400, 'Error al actualizar la tarea')
    }
}

const deleteUserTarea = async(req, res)=>{
    const idUser = req.params.idUser
    const idTarea = req.params.idTarea
    try {
        const User = await UserModel.findOne({_id: idUser, is_active: true})
        if( !User ) response.error(req, res, 400, 'Usuario no existe.')

        const Tarea = await ModeloTarea.findOne({_id: idTarea, is_active: true})
        if( !Tarea ) response.error(req, res, 400, 'Tarea no existe.')

        if( Tarea.usuario.toString() !== idUser.toString() ) response.error(req, res, 400, 'Tarea no pertenece al usuario.')

        Tarea.is_active = false
        await Tarea.save()

        response.success(req, res, 200, Tarea)
    } catch (error) {
        response.error(req, res, 400, 'Error al eliminar la tarea')
    }
}

const signup = async ( req, res ) =>{
    const usuario = req.body

    try {
        const usuarioCreado = await UserModel.create(usuario)
        response.success(req, res, 201, usuarioCreado)
    } catch (error) {
        response.error(req, res, 400, 'Error al crear el usuario')
    }
}

const login = async ( req, res ) => {
    const { email, password } = req.body

    try {
        const User = await UserModel.findOne({ email: email })
        if( !User ) response.error(req, res, 400, 'Error, usuario no encontrado.')

        const validatePassword = Bcrypt.compareSync(password, User.password)
        if( !validatePassword ) response.error(req, res, 400, 'Error, password incorrecto')

        const token = jwt.sign({email, password}, process.env.SECRET_JWT, {expiresIn: '30s'})

        response.success(req, res, 200, token)

    } catch (error) {
        response.error(req, res, 400, error)
    }
}

module.exports = {
    //C RUD USUARIOS
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser,

    // CRUD USUARAIO - TAREA
    getUsersTareas,
    getUserTarea,
    postUserTarea,
    updateUserTarea,
    deleteUserTarea,

    // AUTH
    signup,
    login
}