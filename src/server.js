const app = require('./app');
const sequelize = require('src/Insfracture/Persistence/Sequelize/database');
const UserModel = require('src/Insfracture/Persistence/Sequelize/models/UserModel');
const { connectRedis} = require('src/Insfracture/Persistence/Redis/redisClient');
const config = require('./config/index');

const PORT = config.server.port;

async function startServer() {
    try {

        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Database connected and synchronized successfully.');

        await connectRedis();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log('Access API at http://localhost:${PORT}');
        });
    }   catch (error) {
        console.error('Unable to start the server:', error);
        process.exit(1);
    }
}

startServer();