const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const Router = express.Router();  // Certifique-se de usar o 'Router' correto

const veiculoController = require('../Controllers/veiculoController');
const { verifyToken, isAdmin } = require('../Middleware/auth');

// Caminho para o arquivo de veículos
const veiculoPath = path.join(__dirname, '../Middleware/veiculo.json');

// Listagem dos veículos (rota GET)
Router.get('/', (req, res) => {
    fs.readFile(veiculoPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao ler os veículos', error: err });
        }
        try {
            const veiculos = JSON.parse(data);
            res.json(veiculos);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao processar os dados JSON', error: err });
        }
    });
});


// Exportar o roteador para uso no seu arquivo principal do Express
module.exports = Router;  

