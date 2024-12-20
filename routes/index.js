const express = require('express');
const authRoutes = require('./authRoutes');
const veiculoRoutes = require('./veiculoRoutes');
const router = express.Router();

// Definindo rotas para '/auth' e '/veiculo'
router.use('/auth', authRoutes); 
router.use('/veiculo', veiculoRoutes);  

module.exports = router;
