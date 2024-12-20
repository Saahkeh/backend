const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = process.env.JWT_SECRET;

//FUNÇÃO PARA O LOGIN
exports.login = (req, res, next) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            throw { status: 400, message: 'Email e senha são obrigatórios' };
        }
        const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));
        const user = users.find((u) => u.email === email);

        if (!user || !bcrypt.compareSync(senha, user.senha)) {
            throw { status: 401, message: 'Credenciais inválidas' };
        }
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
        res.json({ token });
    } catch (err) {
        next(err);
    }
};
