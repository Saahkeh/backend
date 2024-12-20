const fs = require('fs');
const path = require('path');
const veiculoPath = path.join(__dirname, '../routes/veiculoRoutes');

// Função de exemplo para a rota GET
exports.getVeiculo = (req, res) => {
    res.send('Informações sobre o veículo');
};

// Fazer a listagem dos veículos
exports.listVeiculo = (req, res, next) => {
    try {
        const veiculos = JSON.parse(fs.readFileSync(veiculoPath, 'utf-8'));
        res.json(veiculos); 
    } catch (err) {
        next(err); 
    }
};

// Adicionar um veículo
exports.addVeiculo = (req, res, next) => {
    try {
        const { marca, nome, placa, email, telefone } = req.body;
        if (!marca || !nome || !placa || !email || !telefone) {
            throw { status: 400, message: 'Por favor, insira dados em todos os campos.' };
        }

        const veiculos = JSON.parse(fs.readFileSync(veiculoPath, 'utf-8'));
        const novoVeiculo = { id: veiculos.length + 1, marca, nome, placa, email, telefone };
        veiculos.push(novoVeiculo);

        fs.writeFileSync(veiculoPath, JSON.stringify(veiculos, null, 2));
        res.status(201).json(novoVeiculo);
    } catch (err) {
        next(err); 
    }
};

// Excluir veículo
exports.deleteVeiculo = (req, res, next) => {
    try {
        const { id } = req.params;
        let veiculos = JSON.parse(fs.readFileSync(veiculoPath, 'utf-8'));

        const veiculoExistente = veiculos.some((v) => v.id == id);
        if (!veiculoExistente) {
            throw { status: 404, message: 'Veículo não encontrado' };
        }

        veiculos = veiculos.filter((v) => v.id != id);
        fs.writeFileSync(veiculoPath, JSON.stringify(veiculos, null, 2));

        res.status(204).send();
    } catch (err) {
        next(err); 
    }
};
