require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { authRoutes, usuarioRoutes, dadosRoutes } = require('./routes')

app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(authRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/dados', dadosRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})