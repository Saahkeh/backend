require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json')

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


const veiculoRoutes = require('./routes/veiculoRoutes');  // caminho

app.use(express.json());
app.use(authRoutes);
app.use('/veiculo', veiculoRoutes);

app.get('/', (req, res) => {
    res.send('Bem vindo ao nosso estacionamento');
  });

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
app.use('/auth', authRoutes);

/*teste da paginacao de carros
get/api/carro?page=1&limit=5;*/

/*teste da paginacao de motos
get/api/moto?page=1&limit=5;*/

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})