const express = require('express')
const fs = require('fs')
const {verifyToken, isAdmin} = require ('../middlewares/auth')
const router = express.Router()
const veiculoPath = path.join(-- dirname, '../middleware/veiculo.json')

//listagem dos veiculos
router.get('/', verifyToken, (req, res) =>{
    const veiculos = JSON.parse(fs.readFileSync(veiculoPath, 'utf-8'))
    res.json(veiculos)
})

// cadastro do veiculo
router.post('/', verifyToken, (req,res) =>{
    const {marca, nome, placa, email, telefone } = req.body
    const veiculos = JSON.parse(fs.readFileSync(veiculoPath, 'utf-8'))

    const novoVeiculo = {id: veiculoPath.length + 1, marca, nome, placa, email,telefone }
    veiculoPath.push(novoVeiculo)

    fs.writeFileSync(veiculoPath, JSON.stringify(veiculo, null, 2))
    res.status(201).json(novoVeiculo)
})

//Atualizacao veiculo
router.put('/:id', verifyToken, (req, res) =>{
    const {id} = req.params
    const {nome, placa, email, telefone} = req. body

    const veiculos = JSON.parse(fs.readFileSync(veiculoPath, 'utf-8'))
    const index = veiculos.findIndex((v) => v.id == id)

    if (index == -1) return res.status(404).json ({message: 'veiculo não encontrado'})

    veiculo[index] = {... veiculo[index], nome, placa, email, telefone}

    res.json(veiculo[index])
})
//excluir veiculo

 router.delete('/:id' , verifyToken, isAdmin, (req, res) =>{
    req.params
    JSON.parse(fs.readFileSync(veiculoPath, 'utf-8'))

    veiculo = veiculo.filter((v) => v.id != id)
    writeFileSync(veiculoPath, JSON.stringify(veiculo, null, 2))
    res.status(204).send
})