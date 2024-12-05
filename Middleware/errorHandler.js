// caso não tenha token, ele retorna um erro 
if(!token){
    return res.status(401).json({ message: 'Acesso negado' });
}
