const express = require('express');
const Router = express.Router();
const authController = require('../controllers/authController');

const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

// Usuários (exemplo simples)
const users = [
    { username: 'Admin', senha: 'admin' },
    { username: 'sarahalmeida', senha: 'senha123' },
    { username: 'Kell', senha: 'pass452' }
];

// Rota de login
Router.post('/login', (req, res) => {
    const { username, senha } = req.body;

    // Verificar se o usuário existe
    const user = users.find(u => u.username === username && u.senha === senha);
    if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    // Gerar o token JWT
    const token = jwt.sign(
        { username: user.username, role: 'user' },  // Aqui você pode adicionar a role ou outros dados
        JWT_SECRET, 
        { expiresIn: '2h' }
    );

    return res.json({ token });
});

console.log(authController);

module.exports = Router;

    