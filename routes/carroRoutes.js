
const express = require('express');
const router = express.Router();  // Definindo o router
const authenticateToken = require('../middlewares/auth.js'); 
const { createCarro, getCarros, getCarroById, updateCarro, deleteCarro } = require('../controllers/carroControllers'); 
const veiculoRoutes = require('./routes/veiculoRoutes'); 

// Sistema CRUD dos carros
router.post('/', authenticateToken, createCarro);
router.get('/', authenticateToken, getCarros);
router.get('/:id', authenticateToken, getCarroById);
router.put('/:id', authenticateToken, updateCarro);
router.delete('/:id', authenticateToken, deleteCarro);

module.exports = router;
