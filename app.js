require('dotenv').config();

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const express = require('express');
const bodyParser = require('body-parser');


const { authRoutes, usuarioRoutes, dadosRoutes } = require('./routes')

app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(authRoutes);
app.use('/usuario', usuarioRoutes);

app.get('/install', (req, res) => {
   // vai verificar se o administrador ja existe

   const adminExist = users.find(user => user.role === 'admin');
   if(adminExist) {
       return res.status(400).json({message: 'Administrador ja existe'})
   }

   // cria o usuario administrador

   const adminUser = {
      id: users.length + 1,
      usuario:'admin',
      senha:'admin',
      role:"admin"
   }
})
app.use('/dados', dadosRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})