//funcao pra validar o usuario 
function validarUser (req, res, next){
    const {error} = userSchema.validate(req.body, {abortEarly: false})

    if(error) {
        //formata a resposta
        const errorMessages = error.details.map((detail) => detail.message)
        return res.status(400).json({message:'Erro de validacao dos dados', errors: errorMessages})

    }
    next()
}
module.exports = {validateUsers}