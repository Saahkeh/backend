const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "Estacionamento",
        description: "Controle de entrada de carro e moto, definicao de prioridade entre os veiculos"
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
        name: 'Login',
        description: 'entrada do uuario'
        },
        {
        name: 'nome',
        description: 'entrada do nome do dono do veiculo'
        },
        {
        name: 'marca',
        description: 'Rotas relativas para marca dos veiculos'
        },
        {
        name: 'placa',
        description: 'Rotas relativas para a placa do veiculo'
        },
        {
        name: 'email',
        description: 'Rotas relativas para o email do dono'
        },
        {
        name: 'Telefone',
        description: 'Rotas relativas para telefone do dono'
        }
    ],
    components: {
        schemas: {
            // Schema do User
            User: {
                    id: {
                        type: "integer",
                        description: "ID do usuário",
                    },
                    usuario: {
                        type: "string",
                        description: "Nome de usuário",
                        minLength: 3,
                        maxLength: 30
                    },
                    nome: {
                        type: "string",
                        description: "Nome completo do usuário",
                        minLength: 3,
                        maxLength: 50
                    },
                    password: {
                        type: "string",
                        description: "Senha do usuário",
                        minLength: 6
                    },
                    isAdmin: {
                        type: "boolean",
                        description: "Indica se o usuário é administrador"
                    }
                },

            // Schema dados do veiculo
            Dados: {
                    nome: {
                        type: "string",
                        description: "Nome do dono do veiculo",
                        minLength: 3,
                        maxLength: 30
                    },
                    marca: {
                        type: "string",
                        description: "marca do veiculo",
                        minLength: 3,
                        maxLength: 30
                    },
                    placa:{
                        type: "integer",
                        description: "placa do veiculo",
                    },
                    email: {
                        type: "string",
                        description: "Email do contato",
                        format: "email"
                    },
                    telefone: {
                        type: "string",
                        description: "Número de telefone do contato",
                        pattern: "^[0-9]{10,15}$"
                    }
                },
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Autenticação por token Bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app'); // Inicia o servidor após a geração do arquivo Swagger
});