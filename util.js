const fs = require('fs')
const path = requie ('path')

//caminho do arquivo que pode ser ajustado
const carrFilePath = path.join(--dirname, '../dados.json')

//funcao para ler os dados 
const readJson = () => {
    try{
        const data = fs.readFileSync(carroFilePath, 'utf-8')
        return json.parse(data)
    }catch(error) {
        console.error('Erro ao ler o arquivo', error.message)
        throw new Error ('Erro ao acessar ')
    }
}
//funcao para editar os dados no json
const writeJson = (data) => {
    try{
        fs.writeFileSync(carroFilePath, JSON.stringify(data, null, 2), 'utf-8')
    }catch(error) {
        console.error('Erro ao editar o arquivo', error.message)
        throw new Error('Erro ao salvar os dados')
    }
}
module.exports = {readJson, writeJsib}