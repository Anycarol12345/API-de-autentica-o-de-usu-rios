const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('module-alias/register');

const db = require('./Infrastructure/Persistence/Sequelize');
const errorHandler = require('./Infrastructure/Express/middlewares/errorHandler');
const SequelizeUserRepository = require('./Infrastructure/Persistence/Sequelize/SequelizeUserRepository');
const RedisTokenBlacklistRepository = require('./Infrastructure/Persistence/Redis/RedisTokenBlacklistRepository');
const JWTProvider = require('./Infrastructure/Providers/JWTProvider');
const authRoutes = require('./Infrastructure/Express/routes/routes');

const RegisterUser = require('./Application/UseCases/Auth/RegisterUser');
const LoginUser = require('./Application/UseCases/Auth/LoginUser');

const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Repositórios e UseCases
const userRepository = new SequelizeUserRepository(db);
const tokenBlacklistRepository = new RedisTokenBlacklistRepository();
const jwtProvider = new JWTProvider();

const registerUserUseCase = new RegisterUser(userRepository);
const loginUserUseCase = new LoginUser(userRepository, jwtProvider);

// Rotas
app.use('/auth', authRoutes(registerUserUseCase, loginUserUseCase));

// Swagger setup
try {
    // Caminho absoluto para o arquivo YAML
    const swaggerPath = path.resolve(__dirname, 'docs', 'api.yaml');

    if (!fs.existsSync(swaggerPath)) {
        throw new Error(`Swagger file not found at: ${swaggerPath}`);
    }

    const swaggerDocument = yaml.load(swaggerPath);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('Swagger loaded at /api-docs');
} catch (e) {
    console.error('Failed to load API swagger.yaml file:', e);
}

// Middleware de tratamento de erros
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send(`
    <h1>API de Autenticação</h1>
    <p>Documentação disponível em <a href="/api-docs">/api-docs</a></p>
  `);
});

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

module.exports = app;
