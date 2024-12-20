const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middleware/auth.js'); 
const { createMoto, getMoto, getMotoById, updateMoto, deleteMoto } = require('../Controllers/motoController.js');

// Sistema CRUD para motos
router.post('/', authenticateToken, createMoto);
router.get('/', authenticateToken, getMoto);
router.get('/moto/:id', authenticateToken, getMotoById);  
router.put('/moto/:id', authenticateToken, updateMoto);    
router.delete('/moto/:id', authenticateToken, deleteMoto); 

module.exports = Router;

