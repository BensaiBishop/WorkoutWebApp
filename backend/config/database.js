require('dotenv').config();
const { Sequelize } = require('sequelize')

const dbHost = process.env.DB_HOST;
const dbPass= process.env.DB_PASSWORD;
const dbUser= process.env.DB_USER;
const dbName= process.env.DB_NAME;

const sequelize = new Sequelize( dbName, dbUser, dbPass, {
        host: dbHost,
        dialect: 'postgres',
        logging: (msg) => console.log(msg),
})

const db = {
    sequelize,
    Sequelize,
    User: require('../models/user')(sequelize,Sequelize.DataTypes),
    Exercise: require('../models/exercise')(sequelize,Sequelize.DataTypes),
}

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

module.exports = db;
