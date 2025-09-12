const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
require('module-alias/register');
const fs = require('fs');

const errorHandler = require('./Insfracture/Express/middlewares/errorHandler');
const SequelizeUserRepository = require('./Insfracture/Persistence/Sequelize/SequelizeUserRepository');
const RedisTokenBlacklistRepository = require('./Insfracture/Persistence/Redis/RedisTokenBlacklistRepository');
const JWTProvider = require('./Insfracture/Providers/JWTProvider');
const authRoutes = require('.Infrastructure/Express/routes/auth.routes');

const RegisterUser = require('./Application/UseCases/Auth/RegisterUser');
const LoginUser = require('./Application/UseCases/Auth/LoginUser');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const userRepository = new SequelizeUserRepository();
const tokenBlacklistRepository = new RedisTokenBlacklistRepository();
const jwtProvider = new JWTProvider();

const registerUserUseCase = new RegisterUser(userRepository);
const loginUserUseCase = new LoginUser(userRepository, jwtProvider);

app.use('/auth', authRoutes(registerUserUseCase, loginUserUseCase));

try{
    const swaggerDocument = yaml.load(fs.readFileSync('./src/docs/api.yaml', 'utf8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

} catch (e) {
    console.error('Failed to load API swagger.yml file:', e);
}

app.use(errorHandler);

module.exports = app;