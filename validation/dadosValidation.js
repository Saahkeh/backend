const { body, validationResult } = require('express-validator');

// Middleware para validar JSON com chaves nome, email, telefone, carroId e motoId para controle
const validateContact = [
    body('nome')
        .notEmpty().withMessage('O nome é obrigatório.')
        .isLength({ min: 2, max: 50 }).withMessage('O nome deve ter entre 2 e 50 caracteres.'),

    body('email')
        .notEmpty().withMessage('O e-mail é obrigatório.')
        .isEmail().withMessage('O e-mail deve ser um endereço de e-mail válido.'),

    body('telefone')
        .optional()
        .isNumeric().withMessage('O telefone deve conter apenas números.')
        .isLength({ min: 10, max: 15 }).withMessage('O telefone deve ter entre 10 e 15 dígitos.'),

    body('carroId')
        .notEmpty().withMessage('O campo carroId é obrigatório.')
        .isInt({ min: 1 }).withMessage('O userId deve ser um inteiro positivo.'),

    body('motoId')
        .notEmpty().withMessage('O campo motoId é obrigatório.')
        .isInt({ min: 1 }).withMessage('O userId deve ser um inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateDados };