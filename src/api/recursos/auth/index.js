const express = require('express')
const router = express.Router()

const { signup, login } = require('../users/users.controlador')
const { usersValidator, hasheoPassword, validateLogin } = require('../users/users.middleware')

router.post('/login', validateLogin, login)

router.post('/signup', usersValidator, hasheoPassword, signup)

module.exports = router