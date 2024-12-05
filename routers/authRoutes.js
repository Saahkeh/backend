const express = require('express');
const authController = require('../controllers/authController');

const JWT_SECRET = process.env.JWT_SECRET

//PARA O LOGIN
Router.post('/login', authController.login) 
const {email, senha} = req.body

const token = jwt.sign({id : User.id, role: usrr.role}, JWT_SECRET, {expiresIn:'2h'})

module.exports = router;
    