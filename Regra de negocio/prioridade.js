const updatePrioridade = (req, res) => {
    try {
        const { id } = req.params;
        const { prioridade } = req.body;

        // Ler os dados
        const carros = readCarro();
        const motos = readMoto();

        // Encontrar o carro ou moto com o ID fornecido
        const carroIndex = carros.findIndex((carro) => carro.id === parseInt(id));
        const motoIndex = motos.findIndex((moto) => moto.id === parseInt(id));

        // Verificar se o veículo foi encontrado
        if (carroIndex === -1 && motoIndex === -1) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }

        // Atualizar a prioridade
        if (carroIndex !== -1) {
            carros[carroIndex].prioridade = parseInt(prioridade);
            return res.status(200).json({
                message: 'Prioridade do carro atualizada com sucesso',
                veiculo: carros[carroIndex]
            });
        }

        if (motoIndex !== -1) {
            motos[motoIndex].prioridade = parseInt(prioridade);
            return res.status(200).json({
                message: 'Prioridade da moto atualizada com sucesso',
                veiculo: motos[motoIndex]
            });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar prioridade', error: error.message });
    }
};
