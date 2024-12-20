const JWT_SECRET = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
    const token = req.headers['autorizado'];  

    if (!token) {
        return res.status(403).json({ mensagem: 'O token é necessário' });
    }

    JWT_SECRET.verify(token, JWT_SECRET, (err, decoded) => { 
        if (err) {
            return res.status(401).json({ mensagem: 'Token é inválido' });
        }
        req.user = decoded;
        next();
    });
}

function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ mensagem: 'Acesso negado, tente novamente' });
    }
    next();
}

module.exports = { verificarToken, isAdmin };