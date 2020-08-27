const { UserModel } = require('./users.modelo')
const { ModeloTarea } = require('../tareas/tareas.modelo')

const getUsers = async () => {
    const users = await UserModel.find({ is_active: true })
        .sort({ fecha: 'desc' })
        .exec()
    return users
}

const getUser = async ( id ) => {
    const user = await UserModel.findOne({_id: id, is_active: true })
    return user
}

const postUser = async ( user ) => {
    const respuesta = await UserModel.create(user)
    return respuesta
}

const updateUser = async ( id, user ) => {
    await UserModel.findByIdAndUpdate(id, user)
    const respuesta = await UserModel.findById(id)

    return respuesta
}

const deleteUser = async ( id ) => {
    const respuesta = await UserModel.findByIdAndDelete(id)
    return respuesta
}

const hideUser = async ( id, user ) => {
    await UserModel.findByIdAndUpdate(id, user)
    const respuesta = await UserModel.findById(id)

    return respuesta
}

const getUserTareas = async ( id ) => {
    const usuario = await UserModel.findOne({_id: id, is_active: true }).populate('tareas')
    // const tareas = await ModeloTarea.find().where('_id').in(usuario.tareas).exec()
   
    return usuario.tareas
}

const postUserTareas = async ( id, data ) => {
    const usuario = await UserModel.findById(id)
    const tarea = await ModeloTarea.create(data)

    await usuario.tareas.push(tarea._id)
    await usuario.save()

    return tarea
}

module.exports = { getUsers, getUser, postUser, updateUser, deleteUser, hideUser, getUserTareas, postUserTareas }