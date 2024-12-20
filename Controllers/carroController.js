const { deleteCarro } = require("./carroController");

let cars = [];

const createCarro = (req, res) => {
    try {
        const { marca, nome, placa, email, telefone } = req.body;
        // Validação
        if (!marca || !nome || !placa || !email || !telefone) {
            return res.status(400).json({ message: "Por favor preencha todos os campos" });
        }

        // Ordenar por prioridade (se houver prioridade nos carros)
        const sortedCarros = cars.sort((a, b) => b.prioridade - a.prioridade);

        // Adicionar carro
        const carro = { id: cars.length + 1, marca, nome, placa, telefone };
        cars.push(carro);

        res.status(201).json({ message: "Carro cadastrado", carro });
    } catch (err) {
        res.status(404).json({ message: "Erro ao cadastrar o carro", error: err.message });
    }
};

// Listagem de todos os carros
const getCarro = (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query; // Parâmetros de paginação
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);

        const paginaCarro = cars.slice(startIndex, endIndex);

        res.status(200).json({
            total: cars.length, // Total de carros
            page: parseInt(page),
            limit: parseInt(limit),
            data: paginaCarro,
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar carros", error: error.message });
    }
};

// Atualizar carro
const updateCarro = (req, res) => {
    try {
        const { id } = req.params;
        const { marca, nome, placa, email, telefone } = req.body;

        // Procurar pelo id
        const carro = cars.find((carro) => carro.id === parseInt(id));
        if (!carro) {
            return res.status(404).json({ message: "Carro não encontrado" });
        }

        // Atualizar os dados
        carro.marca = marca || carro.marca;
        carro.nome = nome || carro.nome;
        carro.placa = placa || carro.placa;
        carro.email = email || carro.email;
        carro.telefone = telefone || carro.telefone;

        res.status(200).json({ message: "Dados do carro atualizados com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar dados do carro", error: error.message });
    }
};

// Deletar carro
const deleteCarro = (req, res) => {
    try {
        const { id } = req.params;
        const index = cars.findIndex((carro) => carro.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ message: "Carro não encontrado" });
        }

        // Excluir o carro
        cars.splice(index, 1);
        res.status(200).json({ message: "Carro excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir carro", error: error.message });
    }
};

module.exports = { createCarro, getCarro, updateCarro, deleteCarro };
