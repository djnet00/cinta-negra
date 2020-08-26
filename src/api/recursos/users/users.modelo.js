const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    nombre:         String,
    apellido:       String,
    email:          {type: String, unique: true},
    password:       String,
    access_token:   {type: String, unique: true},
    is_active:      {type: Boolean, default: true}
},
{
    timestamps: true
})

const UserModel = mongoose.model('users', usersSchema)

module.exports = { UserModel }