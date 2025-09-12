// src/Infrastructure/Persistence/Sequelize/index.js
const { Sequelize } = require('sequelize');
const UserModel = require('./models/UserModel');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Inicializa o model User
const User = UserModel(sequelize);

// Exporta db com User incluso
const db = {
  sequelize,
  Sequelize,
  User, // <- aqui é importante
};

module.exports = db;
