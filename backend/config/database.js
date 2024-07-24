const { Sequelize } = require('sequelize')
const config = require('./config.json')

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env]

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: console.log,
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
