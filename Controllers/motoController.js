let motos = []

const createMoto = (req, res) => {
    try {
        const {marca, nome, placa, email, telefone} = req.body;
        
        // Validação dos campos obrigatórios
        if (!marca || !nome || !placa || !email || !telefone) {
            return res.status(400).json({message: "Por favor, preencha todos os campos"});
        }

        // Adicionar moto
        const novaMoto = {id: motos.length + 1, marca, nome, placa, email, telefone};
        motos.push(novaMoto);
        
        res.status(201).json({message: "Moto cadastrada", moto: novaMoto});
    } catch (error) {
        res.status(500).json({message: "Erro ao cadastrar a moto", error: error.message});
    }
}

// Listagem de todas as motos
const getMoto = (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query; // Obtendo parâmetros de paginação
        const startIndex = (page - 1) * limit; // Início
        const endIndex = startIndex + parseInt(limit); // Fim

        // Ordenar motos por prioridade (caso exista um campo 'prioridade' em motos)
        const sortedMotos = motos.sort((a, b) => b.prioridade - a.prioridade);

        const paginaMoto = motos.slice(startIndex, endIndex); // Seleciona registros específicos

        res.status(200).json({
            total: motos.length, // Total de Motos
            page: parseInt(page),
            limit: parseInt(limit),
            data: paginaMoto
        });
    } catch (error) {
        res.status(500).json({message: "Erro ao listar motos", error: error.message});
    }
}

// Atualizar dados da moto
const updateMoto = (req, res) => {
    try {
        const { id } = req.params;
        const { marca, nome, placa, email, telefone } = req.body;

        // Procurar pela moto com o id informado
        const moto = motos.find((moto) => moto.id === parseInt(id));
        if (!moto) {
            return res.status(404).json({message: "Moto não encontrada"});
        }

        // Atualização dos dados
        moto.marca = marca || moto.marca;
        moto.nome = nome || moto.nome;
        moto.placa = placa || moto.placa;
        moto.email = email || moto.email;
        moto.telefone = telefone || moto.telefone;

        res.status(200).json({message: "Dados da moto atualizados com sucesso", moto});
    } catch (error) {
        res.status(500).json({message: "Erro ao atualizar dados da moto", error: error.message});
    }
}

// Deletar moto
const deleteMoto = (req, res) => {
    try {
        const { id } = req.params;
        // Procurar pelo índice da moto no array
        const index = motos.findIndex((moto) => moto.id === parseInt(id));

        if (index === -1) {
            return res.status(404).json({message: "Moto não encontrada"});
        }

        // Remover a moto
        motos.splice(index, 1);

        res.status(204).json({message: "Moto excluída com sucesso"});
    } catch (error) {
        res.status(500).json({message: "Erro ao excluir moto", error: error.message});
    }
}

module.exports = { createMoto, getMoto, updateMoto, deleteMoto };
